import { useMemo } from "react";
import { gql } from "graphql-request";
import { num, useAddress } from "@arthuryeti/terra";

import {
  useAstroswap,
  useContracts,
  useTokenInfo,
  useHive,
} from "modules/common";

const createQuery = (pairs, address, generator) => {
  if (pairs.length === 0) {
    return;
  }

  return gql`
    {
      ${pairs.map((lp) => {
        return `
          ${lp}: wasm {
            contractQuery(
              contractAddress: "${generator}"
              query: {
                pending_token: {
                  lp_token: "${lp}"
                  user: "${address}"
                }
              }
            )
          }

          info${lp}: wasm {
            contractQuery(
              contractAddress: "${generator}"
              query: {
                reward_info: {
                  lp_token: "${lp}"
                }
              }
            )
          }
        `;
      })}
    }
`;
};

export const useLpRewards = () => {
  const { pairs } = useAstroswap();
  const { getDecimals } = useTokenInfo();
  const { generator, stakableLp } = useContracts();
  const address = useAddress();
  const query = createQuery(stakableLp, address, generator);

  const result = useHive({
    name: ["rewards", address],
    query,
    options: {
      enabled: !!query,
    },
  });

  return useMemo(() => {
    if (result == null) {
      return [];
    }

    const data = [];

    stakableLp.forEach((lp) => {
      const tokens = result[`info${lp}`].contractQuery;
      const amounts = result[`${lp}`].contractQuery;

      if (num(amounts.pending).gt(0)) {
        data.push({
          token: tokens.base_reward_token,
          amount: num(amounts.pending)
            .div(10 ** getDecimals(tokens.base_reward_token))
            .dp(6)
            .toNumber(),
          lp,
        });
      }

      if (num(amounts.pending_on_proxy).gt(0)) {
        console.group("useLpRewards");
        console.log("tokens", tokens);
        console.log("tokens?.proxy_reward_token", tokens?.proxy_reward_token);
        console.groupEnd();
        data.push({
          token: tokens.proxy_reward_token,
          amount: num(amounts.pending_on_proxy)
            .div(10 ** getDecimals(tokens.proxy_reward_token))
            .dp(6)
            .toNumber(),
          lp,
        });
      }
    });

    return data;
  }, [pairs, result]);
};

export default useLpRewards;
