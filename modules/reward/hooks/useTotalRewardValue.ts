import { useMemo } from "react";

import { useOneTimeLockdropRewards } from "modules/lockdrop";

export const useTotalRewardValue = () => {
  const lockdropRewardsInUst = useOneTimeLockdropRewards();

  return useMemo(() => {
    return lockdropRewardsInUst;
  }, [lockdropRewardsInUst]);
};

export default useTotalRewardValue;
