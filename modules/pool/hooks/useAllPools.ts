import { useMemo } from "react";
import { gql } from "graphql-request";
import { useTerraWebapp } from "context/TerraWebappContext";
import useLocalStorage from "hooks/useLocalStorage";
import {
  getPoolTokenDenoms,
  useAstroswap,
  useContracts,
  useLunaPriceInUst,
  useTokenInfo,
  useTokenPrices,
  useHiveEndpoint,
  useStableTokenPrice,
  Asset,
  PairResponse,
  requestInChunks,
} from "modules/common";
import { usePoolsInfo } from "modules/pool";
import { getAssetAmountsInPool } from "libs/terra";
import { ONE_TOKEN, QUERY_STALE_TIME } from "constants/constants";
import { BLUNA_LUNA_PAIR_ADDR } from "constants/contracts";
import { useQuery } from "react-query";
import useAddress from "hooks/useAddress";
import num from "libs/num";

export type AllPoolsPool = {
  inUse: boolean;
  favorite: boolean;
  contract: string;
  assets: string[];
  poolAssets: Asset[];
  sortingAssets: string[];
  pairType: string;
  totalLiquidity: number;
  totalLiquidityInUst: number;
  myLiquidity: number;
  myLiquidityInUst: number;
  _24hr_volume: number;
  rewards: {
    pool: number;
    astro: number;
    protocol: number;
    total: number;
    apy: number;
    token_symbol: string;
  };
  canManage: boolean;
  canStake: boolean;
  isStakable: boolean;
};

const createQuery = (pairs: any, address: string, generator: string) => {
  return gql`
    {
      ${pairs.map(
        ({
          liquidity_token,
          contract_addr,
        }: {
          liquidity_token: string;
          contract_addr: string;
        }) => {
          return `
          ${contract_addr}: wasm {
            contractQuery(
              contractAddress: "${contract_addr}"
              query: {
                pool: { }
              }
            )
          }
          ${liquidity_token}: wasm {
            contractQuery(
              contractAddress: "${liquidity_token}"
              query: {
                balance: {
                  address: "${address}"
                }
              }
            )
          }
          staked${liquidity_token}: wasm {
            contractQuery(
              contractAddress: "${generator}"
              query: {
                deposit: {
                  lp_token: "${liquidity_token}"
                  user: "${address}"
                }
              }
            )
          }
        `;
        }
      )}
    }
`;
};

const createQueryNotConnected = (pairs: any) => {
  return gql`
    {
      ${pairs.map(({ contract_addr }: { contract_addr: string }) => {
        return `
          ${contract_addr}: wasm {
            contractQuery(
              contractAddress: "${contract_addr}"
              query: {
                pool: { }
              }
            )
          }
        `;
      })}
    }
`;
};

export const useAllPools = () => {
  const { pairs } = useAstroswap();
  const { network } = useTerraWebapp();
  const { generator, stakableLp, bLunaToken } = useContracts();
  const address = useAddress();
  const lunaPrice = useLunaPriceInUst();
  const bLunaPrice = useStableTokenPrice(bLunaToken, "uluna");
  const poolsInfo = usePoolsInfo();
  const { getSymbol, getDecimals } = useTokenInfo();
  const [favoritesPools] = useLocalStorage<string[]>("favoritesPools", []);
  const tokensInUst = useTokenPrices();
  const { hiveEndpoint, fallbackHiveEndpoint } = useHiveEndpoint();

  const queryBuilder = address
    ? (chunk: any) => createQuery(chunk, address, generator)
    : (chunk: any) => createQueryNotConnected(chunk);

  let firstAttempt = true;
  const { data: result } = useQuery(
    ["pools", "all", address],
    () => {
      const url = firstAttempt ? hiveEndpoint : fallbackHiveEndpoint;
      firstAttempt = false;
      // Chunk pairs into multiple queries to stay below GraphQL query size limitations
      return requestInChunks<PairResponse>(50, url, pairs || [], queryBuilder);
    },
    {
      enabled: (pairs || []).length > 0,
      staleTime: QUERY_STALE_TIME,
      retry: 1,
    }
  );

  const getPoolInfo = (addr: string) => {
    return poolsInfo.find((poolInfo: any) => poolInfo.pool_address === addr);
  };

  return useMemo((): AllPoolsPool[] => {
    if (result == null || !pairs) {
      return [];
    }

    return pairs
      .map(({ contract_addr, liquidity_token, pair_type }): AllPoolsPool => {
        const poolInfo = getPoolInfo(contract_addr);
        const providedBalance = result[liquidity_token]?.contractQuery.balance;

        // in the event of switching networks, pair and price queries are still being refetched
        // and pool info may not be in the result yet.
        // @ts-ignore
        if (!result[contract_addr]) return null;

        const { total_share, assets } = result[contract_addr].contractQuery;
        const stakedBalance = result[`staked${liquidity_token}`]?.contractQuery;
        const denoms = getPoolTokenDenoms(assets);
        const [token1, token2] = denoms;
        const balance = num(providedBalance).plus(stakedBalance);

        let totalLiquidityInUst = poolInfo?.pool_liquidity;

        if (!totalLiquidityInUst) {
          const { token1: uusd } = getAssetAmountsInPool(assets, "uusd");
          totalLiquidityInUst = num(uusd)
            .div(ONE_TOKEN)
            .times(2)
            .dp(6)
            .toNumber();
        }

        // bluna-luna pool
        // @ts-ignore
        if (contract_addr === BLUNA_LUNA_PAIR_ADDR[network.name]) {
          const { token1: uluna, token2: uluna2 } = getAssetAmountsInPool(
            assets,
            "uluna"
          );
          totalLiquidityInUst = num(uluna)
            .plus(num(uluna2).times(bLunaPrice))
            .div(ONE_TOKEN)
            .times(lunaPrice)
            .dp(6)
            .toNumber();
        }

        // non-ust pool, bluna-luna pool
        if (!totalLiquidityInUst) {
          const token2UstValue = tokensInUst[token2 || ""];
          const token2Decimals = getDecimals(token2 || "");

          totalLiquidityInUst = num(token2UstValue)
            .times(assets[1].amount)
            .div(10 ** token2Decimals)
            .times(2)
            .dp(6)
            .toNumber();
        }

        const totalLiquidity = num(total_share).div(ONE_TOKEN).dp(6).toNumber();
        const myLiquidity = num(balance).div(ONE_TOKEN).dp(6).toNumber();
        const myLiquidityInUst = num(balance)
          .div(ONE_TOKEN)
          .times(totalLiquidityInUst)
          .div(num(total_share).div(ONE_TOKEN))
          .dp(6)
          .toNumber();

        const isStakable = stakableLp.includes(liquidity_token);

        return {
          inUse: balance.gt(0),
          favorite: favoritesPools.indexOf(denoms.toString()) > -1,
          contract: contract_addr,
          assets: denoms,
          poolAssets: assets,
          sortingAssets: [
            getSymbol(token1 || "").toLowerCase(),
            getSymbol(token2 || "").toLowerCase(),
            token1 || "",
            token2 || "",
            contract_addr,
          ],
          pairType: Object.keys(pair_type)[0] || "",
          totalLiquidity,
          totalLiquidityInUst,
          myLiquidity,
          myLiquidityInUst,
          _24hr_volume: poolInfo?._24hr_volume,
          rewards: {
            pool: poolInfo?.trading_fees?.apy || 0,
            astro: poolInfo?.astro_rewards?.apr || 0,
            protocol: poolInfo?.protocol_rewards?.apr || 0,
            total: poolInfo?.total_rewards?.apr || 0,
            apy: poolInfo?.total_rewards?.apy || 0,
            token_symbol: poolInfo?.token_symbol,
          },
          canManage: myLiquidity > 0,
          canStake: num(providedBalance).gt(0),
          isStakable,
        };
      })
      .filter(Boolean);
  }, [lunaPrice, pairs, result, poolsInfo, favoritesPools]);
};

export default useAllPools;
