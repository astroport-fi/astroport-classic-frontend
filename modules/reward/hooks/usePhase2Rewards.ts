import { useMemo } from "react";
import { num } from "@arthuryeti/terra";

import { useUserInfo } from "modules/auction";
import { ONE_TOKEN } from "constants/constants";

export const usePhase2Rewards = () => {
  const userInfo = useUserInfo();

  return useMemo(() => {
    if (userInfo == null) {
      return 0;
    }

    if (num(userInfo.auction_incentive_amount).eq(0)) {
      return 0;
    }

    num(userInfo.auction_incentive_amount).div(ONE_TOKEN).dp(6).toNumber();
  }, [userInfo]);
};

export default usePhase2Rewards;
