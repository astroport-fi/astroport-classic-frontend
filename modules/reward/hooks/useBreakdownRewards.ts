import { useMemo } from "react";
import { groupBy, mapValues, assignIn } from "lodash";
import merge from "deepmerge";
import { num } from "@arthuryeti/terra";

import { useLockdropRewards } from "modules/lockdrop";
import { useLpRewards, usePhase2Rewards } from "modules/reward";
import { useContracts } from "modules/common";

export const useBreakdownRewards = () => {
  const { list: lockRewards } = useLockdropRewards();
  const lpRewards = useLpRewards();
  const { astroToken } = useContracts();
  const phase2Rewards = usePhase2Rewards();

  return useMemo(() => {
    const lpRewardsGroups = groupBy(lpRewards, "token");
    const lockRewardsGroups = groupBy(lockRewards, "token");
    const groups = merge(lockRewardsGroups, lpRewardsGroups);
    const rewards = mapValues(groups, (value) => {
      return value.reduce((acc, cur) => {
        return num(acc).plus(cur.amount).toNumber();
      }, 0);
    });

    const groupedRewards = Object.keys(rewards).map((token) => {
      const lpPositions = lpRewardsGroups[token]
        ? lpRewardsGroups[token]?.map((a) => ({ ...a, type: "lp" }))
        : [];

      const lockdropPositions = lockRewardsGroups[token]
        ? lockRewardsGroups[token]?.map((a) => ({ ...a, type: "lockdrop" }))
        : [];

      return {
        token,
        amount: rewards[token],
        positions: [...lpPositions, ...lockdropPositions],
      };
    });

    if (phase2Rewards === 0) {
      return groupedRewards;
    }

    const index = groupedRewards.findIndex((gr) => gr.token === astroToken);
    if (index === -1) {
      groupedRewards.push({
        token: astroToken,
        amount: phase2Rewards,
        positions: [
          { token: astroToken, amount: phase2Rewards, type: "phase2" },
        ],
      });
    } else {
      groupedRewards[index].amount += phase2Rewards;
      groupedRewards[index].positions.push({
        token: astroToken,
        amount: phase2Rewards,
        type: "phase2",
      });
    }

    return groupedRewards;
  }, [lpRewards, lockRewards, astroToken, phase2Rewards]);
};

export default useBreakdownRewards;
