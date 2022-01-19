import { useMemo } from "react";
import { groupBy, mapValues, assignIn } from "lodash";
import merge from "deepmerge";
import { num } from "@arthuryeti/terra";

import { useLockdropRewards } from "modules/lockdrop";
import { useLpRewards } from "modules/reward";

export const useBreakdownRewards = () => {
  const { list: lockRewards } = useLockdropRewards();
  const lpRewards = useLpRewards();

  return useMemo(() => {
    const lpRewardsGroups = groupBy(lpRewards, "token");
    const lockRewardsGroups = groupBy(lockRewards, "token");
    const groups = merge(lockRewardsGroups, lpRewardsGroups);
    const rewards = mapValues(groups, (value) => {
      return value.reduce((acc, cur) => {
        return num(acc).plus(cur.amount).toNumber();
      }, 0);
    });

    return Object.keys(rewards).map((token) => {
      return {
        token,
        amount: rewards[token],
      };
    });
  }, [lpRewards, lockRewards]);
};

export default useBreakdownRewards;
