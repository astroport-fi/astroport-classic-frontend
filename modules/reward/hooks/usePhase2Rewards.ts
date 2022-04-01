import { useMemo } from "react";
import { num } from "@arthuryeti/terra";

import { useUserInfo } from "modules/auction";
import { ONE_TOKEN } from "constants/constants";

export const usePhase2Rewards = () => {
  const userInfo = useUserInfo();

  return useMemo(() => {
    if (userInfo == null) {
      return {
        oneTimeRewards: 0,
        ongoingEmissions: 0,
      };
    }

    const ongoingEmissions = num(userInfo.withdrawable_lp_shares).eq(0)
      ? 0
      : num(userInfo.withdrawable_lp_shares).div(ONE_TOKEN).dp(6).toNumber();

    if (userInfo.astro_incentive_transferred) {
      return {
        oneTimeRewards: 0,
        ongoingEmissions,
      };
    }

    if (num(userInfo.auction_incentive_amount).eq(0)) {
      return {
        oneTimeRewards: 0,
        ongoingEmissions,
      };
    }

    return {
      oneTimeRewards: num(userInfo.auction_incentive_amount)
        .div(ONE_TOKEN)
        .dp(6)
        .toNumber(),
      ongoingEmissions,
    };
  }, [userInfo]);
};

export default usePhase2Rewards;
