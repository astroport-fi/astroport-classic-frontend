import { useMemo } from "react";
import { useTerra } from "@arthuryeti/terra";
import BigNumber from "bignumber.js";

import { useLpBalances } from "modules/pool";

export const usePools = () => {
  const { pairs } = useTerra();
  const lpBalances = useLpBalances();

  const mine = useMemo(() => {
    return pairs.filter((v) => {
      return new BigNumber(lpBalances[v.lpToken]).isGreaterThan(0);
    });
  }, [lpBalances, pairs]);

  return {
    mine,
    all: pairs,
  };
};

export default usePools;
