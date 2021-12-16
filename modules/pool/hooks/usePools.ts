import { useMemo } from "react";

import { useLpBalances } from "modules/pool";
import { useAstroswap } from "modules/common";
import { num } from "@arthuryeti/terra";

export const usePools = () => {
  const { pairs } = useAstroswap();
  const lpBalances = useLpBalances();

  // TODO: Move it to the backend
  const all = useMemo(() => {
    if (pairs == null) {
      return null;
    }

    return pairs.filter((v) => {
      return num(lpBalances[v.liquidity_token]).eq(0);
    });
  }, [lpBalances, pairs]);

  const mine = useMemo(() => {
    if (pairs == null) {
      return null;
    }

    return pairs.filter((v) => {
      return num(lpBalances[v.liquidity_token]).gt(0);
    });
  }, [lpBalances, pairs]);

  return {
    mine,
    all,
  };
};

export default usePools;
