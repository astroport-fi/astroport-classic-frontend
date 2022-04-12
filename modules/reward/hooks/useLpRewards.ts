import { useMemo } from "react";
import { gql } from "graphql-request";
import { num, useAddress } from "@arthuryeti/terra";
import { useContracts, useTokenInfo, useHive } from "modules/common";

const createQuery = (lps: any[], address: string, generator: string) => {
  if (lps.length === 0 || !address) {
    return;
  }

  return gql`
    {
      ${lps.map((lp) => {
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
  const { getDecimals } = useTokenInfo();
  const { generator, stakableLp } = useContracts();
  const address = useAddress();
  const query = createQuery(stakableLp, address || "", generator);

  const result = useHive({
    name: ["rewards", "lp"],
    query,
    options: {
      enabled: !!query,
    },
  });

  return useMemo(() => {
    if (result == null) {
      return [];
    }

    const data: any[] = [];

    stakableLp.forEach((lp) => {
      const tokens = result[`info${lp}`]?.contractQuery;
      const amounts = result[`${lp}`]?.contractQuery;

      if (num(amounts?.pending).gt(0)) {
        data.push({
          token: tokens.base_reward_token,
          amount: num(amounts.pending)
            .div(10 ** getDecimals(tokens.base_reward_token))
            .dp(6)
            .toNumber(),
          lp,
        });
      }

      if (num(amounts?.pending_on_proxy).gt(0)) {
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
  }, [stakableLp, result]);
};

export default useLpRewards;
