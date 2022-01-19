import { useMemo } from "react";

import { useOneTimeLockdropRewards } from "modules/lockdrop";
import { useBreakdownRewardsInUst } from "modules/reward";

export const useTotalRewardValueInUst = () => {
  const lockdropRewardsInUst = useOneTimeLockdropRewards();
  const breakdownRewardsInUst = useBreakdownRewardsInUst();

  return useMemo(() => {
    return lockdropRewardsInUst + breakdownRewardsInUst;
  }, [lockdropRewardsInUst, breakdownRewardsInUst]);
};

export default useTotalRewardValueInUst;
