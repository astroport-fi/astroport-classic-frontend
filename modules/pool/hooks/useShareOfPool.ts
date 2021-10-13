import { useMemo } from "react";
import { num } from "@arthuryeti/terra";

import { PoolResponse } from "modules/common";

type Response = string | null;

type Params = {
  pool: PoolResponse | null | undefined;
  amount1: string | null;
};

export const useShareOfPool = ({ pool, amount1 }: Params): Response => {
  return useMemo(() => {
    if (pool == null || amount1 == null || num(pool.total_share).isEqualTo(0)) {
      return null;
    }

    const token1Amount = pool.assets[0].amount;

    return num(amount1).div(token1Amount).times("100").toFixed(2);
  }, [pool, amount1]);
};

export default useShareOfPool;
