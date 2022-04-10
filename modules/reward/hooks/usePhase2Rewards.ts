import { useMemo } from "react";
import { num } from "@arthuryeti/terra";

import { useUserInfo } from "modules/auction";
import { useContracts, useTokenInfo } from "modules/common";
import { ONE_TOKEN } from "constants/constants";

export const usePhase2Rewards = () => {
  const { astroToken } = useContracts();
  const userInfo = useUserInfo();
  const { getDecimals } = useTokenInfo();

  return useMemo(() => {
    if (userInfo == null) {
      return {
        oneTimeRewards: 0,
        ongoingEmissions: 0,
      };
    }

    const ongoingEmissions = num(userInfo.claimable_generator_astro).eq(0)
      ? 0
      : +userInfo.claimable_generator_astro / 10 ** getDecimals(astroToken);

    if (
      userInfo.astro_incentive_transferred ||
      num(userInfo.auction_incentive_amount).eq(0)
    ) {
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
