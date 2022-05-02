import { useMemo } from "react";
import num from "libs/num";

import { PoolResponse } from "modules/common";

type Response = number | null;

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

    return num(lpAmount)
      .times("100")
      .div(pool.total_share || "")
      .toNumber();
  }, [pool, lpAmount]);
};

export default useShareOfPool;
