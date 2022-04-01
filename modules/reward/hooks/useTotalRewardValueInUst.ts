import { useMemo } from "react";

import {
  useBreakdownRewardsTotalInUst,
  usePhase1Rewards,
  usePhase2Rewards,
} from "modules/reward";
import { useContracts } from "modules/common";
import { num } from "@arthuryeti/terra";
import { useTokenPriceInUstWithSimulate } from "modules/swap";

export const useTotalRewardValueInUst = () => {
  const { astroToken } = useContracts();
  const astroPrice = useTokenPriceInUstWithSimulate(astroToken);
  const phase1Rewards = usePhase1Rewards();
  const phase2Rewards = usePhase2Rewards();
  const breakdownRewardsTotalInUst = useBreakdownRewardsTotalInUst();

  return useMemo(() => {
    const lockdropRewardsInUst = num(
      phase1Rewards +
        phase2Rewards.oneTimeRewards +
        phase2Rewards.ongoingEmissions
    )
      .times(astroPrice)
      .toNumber();

    return lockdropRewardsInUst + breakdownRewardsTotalInUst;
  }, [phase1Rewards, phase2Rewards, breakdownRewardsTotalInUst]);
};

export default useTotalRewardValueInUst;
