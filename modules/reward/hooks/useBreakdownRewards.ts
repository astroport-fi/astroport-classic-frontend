import { useMemo } from "react";
import { groupBy, mapValues } from "lodash";
import { num } from "@arthuryeti/terra";

import { useLockdropRewards } from "modules/lockdrop";
import { useGeneratorRewards } from "modules/generator";

export const useBreakdownRewards = () => {
  const lock = useLockdropRewards();
  const generator = useGeneratorRewards();

  return useMemo(() => {
    const groups = groupBy(generator, "token");
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
