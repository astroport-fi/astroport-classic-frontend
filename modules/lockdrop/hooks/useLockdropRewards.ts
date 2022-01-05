import { useMemo } from "react";
import { num } from "@arthuryeti/terra";

import { useContracts } from "modules/common";
import { useUserInfo } from "modules/lockdrop";

export const useLockdropRewards = () => {
  const { astroToken } = useContracts();
  const userInfo = useUserInfo();

  return useMemo(() => {
    if (userInfo == null) {
      return [];
    }

    const data = [];

    userInfo.lockup_infos.forEach((info) => {
      if (num(info.claimable_generator_astro_debt).gt(0)) {
        data.push({
          token: astroToken,
          amount: info.claimable_generator_astro_debt,
          lp: info.astroport_lp_token,
        });
      }

      if (num(info.claimable_generator_proxy_debt).gt(0)) {
        data.push({
          token: "astroToken",
          amount: info.claimable_generator_proxy_debt,
          lp: info.astroport_lp_token,
        });
      }
    });

    return data;
  }, [userInfo]);
};

export default useLockdropRewards;
