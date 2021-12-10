import { useMemo } from "react";
import BigNumber from "bignumber.js";

import { useLpBalances } from "modules/pool";
import { useAstroswap } from "modules/common";

export const usePools = () => {
  const { pairs } = useAstroswap();
  const lpBalances = useLpBalances();

  // TODO: Move it to the backend
  const all = useMemo(() => {
    if (pairs == null) {
      return null;
    }

    return pairs.filter((v) => {
      // @ts-expect-error
      return new BigNumber(lpBalances[v.liquidity_token]).isEqualTo(0);
    });
  }, [lpBalances, pairs]);

  const mine = useMemo(() => {
    if (pairs == null) {
      return null;
    }

    return pairs.filter((v) => {
      // @ts-expect-error
      return new BigNumber(lpBalances[v.liquidity_token]).isGreaterThan(0);
    });
  }, [lpBalances, pairs]);

  return {
    mine,
    all,
  };
};

export default usePools;
