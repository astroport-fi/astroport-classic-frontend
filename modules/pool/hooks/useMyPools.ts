import { useMemo } from "react";
import { gql } from "graphql-request";
import { num, useAddress } from "@arthuryeti/terra";
import { sortBy, compact } from "lodash";

import {
  getPoolTokenDenoms,
  useAstroswap,
  useContracts,
  useLunaPrice,
  useHive,
} from "modules/common";
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

export const useMyPools = () => {
  const { pairs } = useAstroswap();
  const { generator, stakableLp } = useContracts();
  const address = useAddress();
  const lunaPrice = useLunaPrice();

  const query = address ? createQuery(pairs, address, generator) : null;
  const result = useHive({
    name: ["pools", "my", address],
    query,
    options: {
      enabled: !!query,
    },
  });

  return useMemo(() => {
    if (result == null) {
      return [];
    }

    const items = pairs.map(({ contract_addr, liquidity_token, pair_type }) => {
      const providedBalance = result[liquidity_token]?.contractQuery.balance;
      const { total_share, assets } = result[contract_addr].contractQuery;
      const stakedBalance = result[`staked${liquidity_token}`]?.contractQuery;
      const denoms = getPoolTokenDenoms(assets);
      const { token1 } = getAssetAmountsInPool(assets, "uusd");
      const balance = num(providedBalance).plus(stakedBalance);

      if (balance.eq(0)) {
        return null;
      }

      let amountOfUst = num(token1).div(ONE_TOKEN);

      if (token1 == null) {
        const { token1: uluna } = getAssetAmountsInPool(assets, "uluna");
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
        contract: contract_addr,
        assets: denoms,
        pairType: Object.keys(pair_type)[0],
        totalLiquidity,
        totalLiquidityInUst,
        myLiquidity,
        myLiquidityInUst,
        canManage: num(providedBalance).gt(0),
        canStake: num(stakedBalance).gt(0),
        isStakable,
      };
    });

    return sortBy(compact(items), "myLiquidityInUst").reverse();
  }, [lunaPrice, pairs, result]);
};

export default useMyPools;
