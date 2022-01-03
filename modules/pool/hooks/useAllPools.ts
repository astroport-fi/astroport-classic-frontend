import { useMemo } from "react";
import { gql } from "graphql-request";
import { num, useAddress } from "@arthuryeti/terra";
import { sortBy, compact } from "lodash";

import { getPoolTokenDenoms, useAstroswap, useLunaPrice } from "modules/common";
import { useHive } from "hooks/useHive";
import { getAssetAmountsInPool } from "libs/terra";
import { ONE_TOKEN } from "constants/constants";
import { useBLunaPriceInLuna } from "modules/swap";

const createQuery = (pairs, address) => {
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
  const address = useAddress();
  const lunaPrice = useLunaPrice();
  const bLunaPrice = useBLunaPriceInLuna();

  let query = createQueryNotConnected(pairs);

  if (address) {
    query = createQuery(pairs, address);
  }

  const result = useHive({
    name: ["pools", "all", address],
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
      const balance = result[liquidity_token]?.contractQuery.balance;
      const { total_share, assets } = result[contract_addr].contractQuery;
      const denoms = getPoolTokenDenoms(assets);
      const { token1 } = getAssetAmountsInPool(assets, "uusd");

      if (num(balance).gt(0)) {
        return null;
      }

      let amountOfUst = num(token1).div(ONE_TOKEN).times(2).dp(6).toNumber();

      if (token1 == null) {
        const { token1: uluna, token2 } = getAssetAmountsInPool(
          assets,
          "uluna"
        );

        amountOfUst = num(uluna)
          .plus(num(token2).times(bLunaPrice))
          .div(ONE_TOKEN)
          .times(lunaPrice)
          .dp(6)
          .toNumber();
      }

      const totalLiquidityInUst = amountOfUst;
      const totalLiquidity = num(total_share).div(ONE_TOKEN).dp(6).toNumber();

      const myLiquidity = num(balance).div(ONE_TOKEN).dp(6).toNumber();
      const myLiquidityInUst = num(balance)
        .div(ONE_TOKEN)
        .times(totalLiquidityInUst)
        .div(num(total_share).div(ONE_TOKEN))
        .dp(6)
        .toNumber();

      return {
        contract: contract_addr,
        assets: denoms,
        pairType: Object.keys(pair_type)[0],
        totalLiquidity,
        totalLiquidityInUst,
        myLiquidity,
        myLiquidityInUst,
      };
    });

    return sortBy(compact(items), "totalLiquidityInUst").reverse();
  }, [lunaPrice, pairs, result, bLunaPrice]);
};

export default useAllPools;
