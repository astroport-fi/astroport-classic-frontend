import { useMemo } from "react";
import { num } from "@arthuryeti/terra";
import { gql } from "graphql-request";

import { useContracts, useHive, useTokenInfo } from "modules/common";
import { useUserInfo } from "modules/lockdrop";

const createQuery = (lps, generator) => {
  if (lps.length === 0) {
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

export const useLockdropRewards = () => {
  const { astroToken } = useContracts();
  const userInfo = useUserInfo();
  const { getDecimals } = useTokenInfo();
  const { generator, stakableLp } = useContracts();
  const query = createQuery(stakableLp, generator);

  const result = useHive({
    name: ["rewards-info"],
    query,
    options: {
      enabled: !!query,
    },
  });

  return useMemo(() => {
    if (userInfo == null || result == null) {
      return { list: [], data: [] };
    }

    const rewardInfos = Object.keys(result).map((key) => {
      return { ...result[key].contractQuery, lp: key };
    });

    const list = [];
    const data = [];

    userInfo.lockup_infos.forEach((info) => {
      if (num(info.claimable_generator_astro_debt).gt(0)) {
        list.push({
          token: astroToken,
          amount: num(info.claimable_generator_astro_debt)
            .div(10 ** getDecimals(astroToken))
            .dp(6)
            .toNumber(),
          lp: info.astroport_lp_token,
        });
      }

      if (num(info.claimable_generator_proxy_debt).gt(0)) {
        const rewardInfo = rewardInfos.find(
          ({ lp }) => lp == info.astroport_lp_token
        );

        list.push({
          token: rewardInfo.proxy_reward_token,
          amount: num(info.claimable_generator_proxy_debt)
            .div(10 ** getDecimals(rewardInfo.proxy_reward_token))
            .dp(6)
            .toNumber(),
          lp: info.astroport_lp_token,
        });
      }

      if (
        num(info.claimable_generator_astro_debt).gt(0) ||
        num(info.claimable_generator_proxy_debt).gt(0)
      ) {
        data.push({
          duration: info.duration,
          lp: info.terraswap_lp_token,
        });
      }
    });

    return { list, data };
  }, [userInfo, result]);
};

export default useLockdropRewards;
