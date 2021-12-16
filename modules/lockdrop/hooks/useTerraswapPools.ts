import { gql } from "graphql-request";
import { num, useAddress } from "@arthuryeti/terra";
import { sortBy } from "lodash";

import { useContracts, useLunaPrice } from "modules/common";
import { useHive } from "hooks/useHive";
import { getAssetAmountsInPool } from "libs/terra";
import { ONE_TOKEN } from "constants/constants";

const createQuery = (lockdropContract, pairs, address) => {
  if (pairs.length === 0) {
    return;
  }

  return gql`
    {
      ${pairs.map(({ lp, contract }) => {
        return `
          ${lp}: wasm {
            contractQuery(
              contractAddress: "${lockdropContract}"
              query: {
                pool: {
                  terraswap_lp_token: "${lp}"
                }
              }
            )
          }

          ${contract}: wasm {
            contractQuery(
              contractAddress: "${contract}"
              query: {
                pool: { }
              }
            )
          }

          lock${lp}: wasm {
            contractQuery(
              contractAddress: "${lp}"
              query: {
                balance: {
                  address: "${lockdropContract}"
                }
              }
            )
          }

          balance${lp}: wasm {
            contractQuery(
              contractAddress: "${lp}"
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

const createQueryNotConnected = (lockdropContract, pairs) => {
  if (pairs.length === 0) {
    return;
  }

  return gql`
    {
      ${pairs.map(({ lp, contract }) => {
        return `
          ${lp}: wasm {
            contractQuery(
              contractAddress: "${lockdropContract}"
              query: {
                pool: {
                  terraswap_lp_token: "${lp}"
                }
              }
            )
          }

          lock${lp}: wasm {
            contractQuery(
              contractAddress: "${lp}"
              query: {
                balance: {
                  address: "${lockdropContract}"
                }
              }
            )
          }

          ${contract}: wasm {
            contractQuery(
              contractAddress: "${contract}"
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

export const useTerraswapPools = () => {
  const { lockdrop, pairs } = useContracts();
  const address = useAddress();
  const lunaPrice = useLunaPrice();

  let query = createQueryNotConnected(lockdrop, pairs);

  if (address) {
    query = createQuery(lockdrop, pairs, address);
  }

  const result = useHive({
    name: ["terraswap-pools", address],
    query,
    options: {
      enabled: !!query,
    },
  });

  if (result == null) {
    return [];
  }

  const items = pairs.map(({ lp, contract }) => {
    const { incentives_share, terraswap_pool } = result[lp].contractQuery;
    const balanceData = result[`balance${lp}`]?.contractQuery;
    const lockBalance = result[`lock${lp}`]?.contractQuery.balance;
    const { total_share, assets } = result[contract].contractQuery;
    const { token1 } = getAssetAmountsInPool(assets, "uusd");

    let amountOfUst = num(token1).div(ONE_TOKEN);

    if (token1 == null) {
      const { token1: uluna } = getAssetAmountsInPool(assets, "uluna");
      amountOfUst = num(uluna).div(ONE_TOKEN).times(lunaPrice);
    }

    // TODO: change to use parse terra amount
    const totalLiquidityInUst = amountOfUst.times(2).toNumber();
    // const totalLiquidity = num(total_share).div(ONE_TOKEN).toNumber();

    const totalLiquidity = num(lockBalance).div(ONE_TOKEN).toNumber();
    const totalLiquidityLockedInUst = num(lockBalance)
      .div(ONE_TOKEN)
      .times(totalLiquidityInUst)
      .div(num(total_share).div(ONE_TOKEN))
      .toNumber();

    const astroAllocated = num(incentives_share).div(ONE_TOKEN).toNumber();
    const myLiquidity = num(balanceData?.balance).div(ONE_TOKEN).toNumber();
    const myLiquidityInUst = num(balanceData?.balance)
      .div(ONE_TOKEN)
      .times(totalLiquidityInUst)
      .div(num(total_share).div(ONE_TOKEN))
      .toNumber();

    return {
      name: lp,
      totalLiquidity,
      totalLiquidityInUst: totalLiquidityLockedInUst,
      myLiquidity,
      myLiquidityInUst,
      dualRewards: true,
      terraswapPool: terraswap_pool,
      astroAllocated,
    };
  });

  return sortBy(items, "astroAllocated").reverse();
};

export default useTerraswapPools;
