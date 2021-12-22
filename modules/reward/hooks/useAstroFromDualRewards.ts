import { useMemo } from "react";
import { num, useAddress, useTerraWebapp } from "@arthuryeti/terra";

import { useContracts } from "modules/common";
import { useUserInfo } from "modules/lockdrop";
import { ONE_TOKEN } from "constants/constants";

export const useAstroFromDualRewards = () => {
  const userInfo = useUserInfo();

  return useMemo(() => {
    if (userInfo == null) {
      return 0;
    }

    return userInfo.lockup_infos.reduce((prev, info) => {
      return num(info.claimable_generator_astro_debt)
        .div(ONE_TOKEN)
        .plus(prev)
        .dp(6)
        .toNumber();
    }, 0);
  }, [userInfo]);
};

export default useAstroFromDualRewards;
