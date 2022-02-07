import { useMemo } from "react";

import { useOneTimeLockdropRewards } from "modules/lockdrop";
import { useBreakdownRewardsTotalInUst } from "modules/reward";

export const useTotalRewardValueInUst = () => {
  const lockdropRewardsInUst = useOneTimeLockdropRewards();
  const breakdownRewardsTotalInUst = useBreakdownRewardsTotalInUst();

  return useMemo(() => {
    return lockdropRewardsInUst + breakdownRewardsTotalInUst;
  }, [lockdropRewardsInUst, breakdownRewardsTotalInUst]);
};

export default useTotalRewardValueInUst;
