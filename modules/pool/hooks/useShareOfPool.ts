import { useMemo } from "react";
import { num } from "@arthuryeti/terra";

import { PoolResponse } from "modules/common";

type Response = string | null;

type Params = {
  pool: PoolResponse | null | undefined;
  lpAmount: string | null;
};

export const useShareOfPool = ({ pool, lpAmount }: Params): Response => {
  return useMemo(() => {
    if (
      pool == null ||
      lpAmount == null ||
      num(lpAmount).eq(0) ||
      num(pool.total_share).eq(0)
    ) {
      return null;
    }

    return num(lpAmount).times("100").div(pool.total_share).toFixed(2);
  }, [pool, lpAmount]);
};

export default useShareOfPool;
