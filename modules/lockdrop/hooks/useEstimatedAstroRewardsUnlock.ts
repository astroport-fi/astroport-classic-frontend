import { useMemo } from "react";
import { num } from "@arthuryeti/terra";

import {
  useConfig,
  useLockState,
  usePool,
  useLockedLpAmount,
} from "modules/lockdrop";
import { ONE_TOKEN } from "constants/constants";

type Options = {
  duration: number;
  amount: string;
  lpToken: string;
};

export const useEstimatedAstroRewardsUnlock = ({
  duration,
  amount,
  lpToken,
}: Options) => {
  const config = useConfig();
  const pool = usePool(lpToken);
  const lockState = useLockState();
  const stakedAmount = useLockedLpAmount(lpToken, duration);

  const lockupWeight = useMemo(() => {
    if (config == null || duration == 0) {
      return null;
    }

    return (
      1 + (duration - 1) * (config.weekly_multiplier / config.weekly_divider)
    );
  }, [config, duration]);

  const amountWeight = useMemo(() => {
    if (lockupWeight == null || num(amount).eq(0) || amount == "") {
      return null;
    }

    return num(amount).times(ONE_TOKEN).times(lockupWeight);
  }, [amount, lockupWeight]);

  const stakedAmountWeight = useMemo(() => {
    if (lockupWeight == null || num(stakedAmount).eq(0) || stakedAmount == "") {
      return null;
    }

    return num(stakedAmount).times(ONE_TOKEN).times(lockupWeight);
  }, [lockupWeight, stakedAmount]);

  return useMemo(() => {
    if (
      config == null ||
      pool == null ||
      lockState == null ||
      amountWeight == null ||
      stakedAmountWeight == null
    ) {
      return null;
    }

    const first = num(pool.incentives_share).div(
      lockState.total_incentives_share
    );
    const second = num(
      num(stakedAmountWeight).minus(num(amountWeight).times(ONE_TOKEN))
    ).div(num(pool.weighted_amount).minus(amountWeight).times(ONE_TOKEN));

    let result = num(first)
      .times(second)
      .times(config.lockdrop_incentives)
      .toString();

    return num(result).div(ONE_TOKEN).toString();
  }, [amountWeight, pool, config, lockState, stakedAmountWeight]);
};

export default useEstimatedAstroRewardsUnlock;
