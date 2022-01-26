import { useMemo } from "react";
import { gql } from "graphql-request";
import { num, useAddress } from "@arthuryeti/terra";
import useLocalStorage from "hooks/useLocalStorage";
import {
  getPoolTokenDenoms,
  useAstroswap,
  useContracts,
  useLunaPrice,
  useHive,
  useTokenInfo,
} from "modules/common";
import { usePoolsInfo } from "modules/pool";
import { getAssetAmountsInPool } from "libs/terra";
import { ONE_TOKEN } from "constants/constants";
import { useBLunaPriceInLuna } from "modules/swap";

const createQuery = (pairs, address, generator) => {
  if (pairs.length === 0) {
    return;
  }

  return gql`
    {
      ${pairs.map(({ liquidity_token, contract_addr }) => {
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
      })}
    }
`;
};

const createQueryNotConnected = (pairs) => {
  if (pairs.length === 0) {
    return;
  }

  return gql`
    {
      ${pairs.map(({ contract_addr }) => {
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
  const { generator, stakableLp } = useContracts();
  const address = useAddress();
  const lunaPrice = useLunaPrice();
  const bLunaPriceInLuna = useBLunaPriceInLuna();
  const poolsInfo = usePoolsInfo();
  const { getSymbol } = useTokenInfo();
  const [favoritesPools] = useLocalStorage("favoritesPools", []);

  const query = address
    ? createQuery(pairs, address, generator)
    : createQueryNotConnected(pairs);
  const result = useHive({
    name: ["pools", "all", address],
    query,
    options: {
      enabled: !!query,
    },
  });

  const getPoolInfo = (addr) => {
    return poolsInfo.find((poolInfo) => poolInfo.pool_address === addr);
  };

  return useMemo(() => {
    if (result == null) {
      return [];
    }

    return pairs.map(({ contract_addr, liquidity_token, pair_type }) => {
      const poolInfo = getPoolInfo(contract_addr);
      const providedBalance = result[liquidity_token]?.contractQuery.balance;
      const { total_share, assets } = result[contract_addr].contractQuery;
      const stakedBalance = result[`staked${liquidity_token}`]?.contractQuery;
      const denoms = getPoolTokenDenoms(assets);
      const [token1, token2] = denoms;
      const balance = num(providedBalance).plus(stakedBalance);

      const { token1: uusd } = getAssetAmountsInPool(assets, "uusd");
      let totalLiquidityInUst = num(uusd)
        .div(ONE_TOKEN)
        .times(2)
        .dp(6)
        .toNumber();
      if (uusd == null) {
        const { token1: uluna, token2: uluna2 } = getAssetAmountsInPool(
          assets,
          "uluna"
        );
        totalLiquidityInUst = num(uluna)
          .plus(num(uluna2).times(bLunaPriceInLuna))
          .div(ONE_TOKEN)
          .times(lunaPrice)
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
        favorite: favoritesPools.indexOf(denoms.toString()) > -1 ? 1 : 0,
        contract: contract_addr,
        assets: denoms,
        sortingAssets: [
          getSymbol(token1).toLowerCase(),
          getSymbol(token2).toLowerCase(),
          token1,
          token2,
          contract_addr,
        ],
        pairType: Object.keys(pair_type)[0],
        totalLiquidity,
        totalLiquidityInUst,
        myLiquidity,
        myLiquidityInUst,
        _24hr_volume: poolInfo?._24hr_volume,
        apy: {
          pool: poolInfo?.trading_fees?.apy || 0,
          astro: poolInfo?.astro_rewards?.apy || 0,
          protocol: poolInfo?.protocol_rewards?.apy || 0,
          total_apr: poolInfo?.total_rewards?.apr || 0,
          total: poolInfo?.total_rewards?.apy || 0,
          reward_symbol: poolInfo?.token_symbol,
        },
        canManage: num(providedBalance).gt(0),
        canStake: num(stakedBalance).gt(0),
        isStakable,
      };
    });
  }, [lunaPrice, pairs, result, poolsInfo, favoritesPools]);
};

export default useAllPools;
