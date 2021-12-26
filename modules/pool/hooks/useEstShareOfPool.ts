import { useMemo } from "react";
import { num } from "@arthuryeti/terra";

import { Pool } from "modules/pool";
import { ONE_TOKEN } from "constants/constants";

type Response = string | null;

type Params = {
  pool: Pool | null | undefined;
  amount1: string | null;
};

export const useEstShareOfPool = ({ pool, amount1 }: Params): Response => {
  return useMemo(() => {
    if (
      pool == null ||
      amount1 == null ||
      num(amount1).isNaN() ||
      num(amount1).eq(0) ||
      num(pool.total.share).eq(0)
    ) {
      return "0.00";
    }

    const token1Amount = pool.assets[0].amount;

    return num(amount1)
      .times(ONE_TOKEN)
      .div(token1Amount)
      .times("100")
      .toFixed(2);
  }, [pool, amount1]);
};

export default useEstShareOfPool;
