import { useMemo } from "react";
import { groupBy, mapValues } from "lodash";
import merge from "deepmerge";
import { num } from "@arthuryeti/terra";
import { useLockdropRewards } from "modules/lockdrop";
import { useLpRewards } from "modules/reward";
import { useContracts } from "modules/common";

export const useBreakdownRewards = () => {
  const { list: lockRewards } = useLockdropRewards();
  const lpRewards = useLpRewards();
  const { astroToken } = useContracts();

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
      const lpPositions =
        lpRewardsGroups[token]?.map((a) => ({ ...a, type: "lp" })) || [];
      const lockdropPositions =
        lockRewardsGroups[token]?.map((a) => ({ ...a, type: "lockdrop" })) ||
        [];

      return {
        token,
        amount: rewards[token],
        positions: [...lpPositions, ...lockdropPositions],
      };
    });
  }, [lpRewards, lockRewards, astroToken]);
};

export default useBreakdownRewards;
