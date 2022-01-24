import { useMemo } from "react";
import { gql } from "graphql-request";
import { num, useAddress } from "@arthuryeti/terra";
import { sortBy, compact } from "lodash";

import useLocalStorage from "hooks/useLocalStorage";

import {
  getPoolTokenDenoms,
  useAstroswap,
  useContracts,
  useLunaPrice,
  useHive,
  useTokenInfo,
} from "modules/common";
import { usePoolsApy } from "modules/pool";
import { getAssetAmountsInPool } from "libs/terra";
import { ONE_TOKEN } from "constants/constants";

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

export const useMyPools = () => {
  const { pairs } = useAstroswap();
  const { generator, stakableLp } = useContracts();
  const address = useAddress();
  const lunaPrice = useLunaPrice();
  const poolsApy = usePoolsApy();
  const { getSymbol } = useTokenInfo();

  const [favoritesPools] = useLocalStorage("favoritesPools", []);

  const query = address ? createQuery(pairs, address, generator) : null;
  const result = useHive({
    name: ["pools", "my", address],
    query,
    options: {
      enabled: !!query,
    },
  });

  const getPoolApy = (addr) => {
    return poolsApy.find((poolApy) => poolApy.pool_address === addr);
  };

  return useMemo(() => {
    if (result == null) {
      return [];
    }

    const items = pairs.map(({ contract_addr, liquidity_token, pair_type }) => {
      const poolApy = getPoolApy(contract_addr);
      const providedBalance = result[liquidity_token]?.contractQuery.balance;
      const { total_share, assets } = result[contract_addr].contractQuery;
      const stakedBalance = result[`staked${liquidity_token}`]?.contractQuery;
      const denoms = getPoolTokenDenoms(assets);
      const [token1, token2] = denoms;
      const token1Symbol = getSymbol(token1);
      const token2Symbol = getSymbol(token2);
      const { token1Amount } = getAssetAmountsInPool(assets, "uusd");
      const balance = num(providedBalance).plus(stakedBalance);

      if (balance.eq(0)) {
        return null;
      }

      let amountOfUst = num(token1Amount).div(ONE_TOKEN);

      if (token1Amount == null) {
        const { token1Amount: uluna } = getAssetAmountsInPool(assets, "uluna");
        amountOfUst = num(uluna).div(ONE_TOKEN).times(lunaPrice);
      }

      const totalLiquidityInUst = amountOfUst.times(2).dp(6).toNumber();
      const totalLiquidity = num(total_share).div(ONE_TOKEN).dp(6).toNumber();

      const myLiquidity = balance.div(ONE_TOKEN).dp(6).toNumber();
      const myLiquidityInUst = balance
        .div(ONE_TOKEN)
        .times(totalLiquidityInUst)
        .div(num(total_share).div(ONE_TOKEN))
        .dp(6)
        .toNumber();

      const isStakable = stakableLp.includes(liquidity_token);

      return {
        favorite: favoritesPools.indexOf(denoms.toString()) > -1 ? 1 : 0,
        contract: contract_addr,
        assets: denoms,
        sortingAssets:
          token1Symbol.toLowerCase() +
          " " +
          token2Symbol.toLowerCase() +
          " " +
          token1 +
          " " +
          token2 +
          " " +
          contract_addr,
        pairType: Object.keys(pair_type)[0],
        totalLiquidity,
        totalLiquidityInUst,
        myLiquidity,
        myLiquidityInUst,
        apy: {
          pool: poolApy?.trading_fees?.apy || 0,
          astro: poolApy?.astro_rewards?.apy || 0,
          protocol: poolApy?.protocol_rewards?.apy || 0,
          total: poolApy?.total_rewards?.apy || 0,
          reward_symbol: poolApy?.token_symbol,
        },
        canManage: num(providedBalance).gt(0),
        canStake: num(stakedBalance).gt(0),
        isStakable,
      };
    });

    return sortBy(compact(items), "myLiquidityInUst").reverse();
  }, [lunaPrice, pairs, result, poolsApy, favoritesPools]);
};

export default useMyPools;
