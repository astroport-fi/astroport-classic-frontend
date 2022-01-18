import { useMemo } from "react";
import { groupBy, mapValues, assignIn } from "lodash";
import merge from "deepmerge";
import { num } from "@arthuryeti/terra";

import { useLockdropRewards } from "modules/lockdrop";
import { useGeneratorRewards } from "modules/generator";

export const useBreakdownRewards = () => {
  const { list: lock } = useLockdropRewards();
  const generator = useGeneratorRewards();

  return useMemo(() => {
    const generatorGroups = groupBy(generator, "token");
    const lockGroups = groupBy(lock, "token");
    const groups = merge(lockGroups, generatorGroups);
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
  }, [generator, lock]);
};

export default useBreakdownRewards;
