import { useMemo } from "react";
import { num, useAddress, useTerraWebapp } from "@arthuryeti/terra";

import { useContracts } from "modules/common";
import { useUserInfo } from "modules/lockdrop";
import { ONE_TOKEN } from "constants/constants";

type Response = {
  airdrop_amount: string;
  delegated_amount: string;
  tokens_withdrawn: boolean;
};

export const usePhase1Rewards = () => {
  const userInfo = useUserInfo();

  const oneTime = useMemo(() => {
    if (userInfo == null) {
      return 0;
    }

    if (userInfo.astro_transferred) {
      return 0;
    }

    return num(userInfo.total_astro_rewards)
      .minus(userInfo.delegated_astro_rewards)
      .div(ONE_TOKEN)
      .dp(6)
      .toNumber();
  }, [userInfo]);

  const poolTotal = useMemo(() => {
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

  return poolTotal + oneTime;
};

export default usePhase1Rewards;
