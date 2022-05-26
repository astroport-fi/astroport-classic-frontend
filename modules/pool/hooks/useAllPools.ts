import { useMemo } from "react";
import { useQuery } from "react-query";
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
  requestInChunks,
  Pool,
} from "modules/common";
import { getAssetAmountsInPool } from "libs/terra";
import { ONE_TOKEN, QUERY_STALE_TIME } from "constants/constants";
import { BLUNA_LUNA_PAIR_ADDR } from "constants/contracts";
import { AllPoolsPool } from "types/common";

const createQuery = (pools: any, address: string, generator: string) => {
  return gql`
    {
      ${pools.map(
        ({
          lp_address,
          pool_address,
        }: {
          lp_address: string;
          pool_address: string;
        }) => {
          return `
          ${pool_address}: wasm {
            contractQuery(
              contractAddress: "${pool_address}"
              query: {
                pool: { }
              }
            )
          }
          ${lp_address}: wasm {
            contractQuery(
              contractAddress: "${lp_address}"
              query: {
                balance: {
                  address: "${address}"
                }
              }
            )
          }
          staked${lp_address}: wasm {
            contractQuery(
              contractAddress: "${generator}"
              query: {
                deposit: {
                  lp_token: "${lp_address}"
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

const createQueryNotConnected = (pools: any) => {
  return gql`
    {
      ${pools.map(({ pool_address }: { pool_address: string }) => {
        return `
          ${pool_address}: wasm {
            contractQuery(
              contractAddress: "${pool_address}"
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
  const { pools } = useAstroswap();
  const { network } = useTerraWebapp();
  const { generator, stakableLp, bLunaToken } = useContracts();
  const address = useAddress();
  const lunaPrice = useLunaPriceInUst();
  const bLunaPrice = useStableTokenPrice(bLunaToken, "uluna");
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
      // Chunk pools into multiple queries to stay below GraphQL query size limitations
      return requestInChunks<Pool>(50, url, pools || [], queryBuilder);
    },
    {
      enabled: (pools || []).length > 0,
      staleTime: QUERY_STALE_TIME,
      retry: 1,
    }
  );

  return useMemo((): AllPoolsPool[] => {
    if (result == null || !pools) {
      return [];
    }

    return pools
      .map(
        ({
          pool_address,
          lp_address,
          pool_type,
          _24hr_volume,
          trading_fees,
          astro_rewards,
          protocol_rewards,
          total_rewards,
          token_symbol,
          pool_liquidity: totalLiquidityInUst,
        }): AllPoolsPool => {
          const providedBalance = result[lp_address]?.contractQuery.balance;

          // in the event of switching networks, pair and price queries are still being refetched
          // and pool info may not be in the result yet.
          // @ts-ignore
          if (!result[pool_address]) return null;

          const { total_share, assets } = result[pool_address].contractQuery;
          const stakedBalance = result[`staked${lp_address}`]?.contractQuery;
          const denoms = getPoolTokenDenoms(assets);
          const [token1, token2] = denoms;
          const balance = num(providedBalance).plus(stakedBalance);

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
          if (pool_address === BLUNA_LUNA_PAIR_ADDR[network.name]) {
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

          const totalLiquidity = num(total_share)
            .div(ONE_TOKEN)
            .dp(6)
            .toNumber();
          const myLiquidity = num(balance).div(ONE_TOKEN).dp(6).toNumber();
          const myLiquidityInUst = num(balance)
            .div(ONE_TOKEN)
            .times(totalLiquidityInUst)
            .div(num(total_share).div(ONE_TOKEN))
            .dp(6)
            .toNumber();

          const isStakable = stakableLp.includes(lp_address);

          return {
            inUse: balance.gt(0),
            favorite: favoritesPools.indexOf(denoms.toString()) > -1,
            contract: pool_address,
            assets: denoms,
            poolAssets: assets,
            sortingAssets: [
              getSymbol(token1 || "").toLowerCase(),
              getSymbol(token2 || "").toLowerCase(),
              token1 || "",
              token2 || "",
              pool_address,
            ],
            pairType: pool_type,
            totalLiquidity,
            totalLiquidityInUst,
            myLiquidity,
            myLiquidityInUst,
            _24hr_volume,
            rewards: {
              pool: trading_fees?.apy || 0,
              astro: astro_rewards?.apr || 0,
              protocol: protocol_rewards?.apr || 0,
              total: total_rewards?.apr || 0,
              apy: total_rewards?.apy || 0,
              token_symbol,
            },
            canManage: myLiquidity > 0,
            canStake: num(providedBalance).gt(0),
            isStakable,
          };
        }
      )
      .filter(Boolean);
  }, [lunaPrice, pools, result, favoritesPools]);
};

export default useAllPools;
