import { useMemo } from "react";
import num from "libs/num";

import { useBalance } from "modules/common";
import { Pool, useTokensToLp } from "modules/pool";
import { ONE_TOKEN } from "constants/constants";

type Response = number | null;

type Params = {
  pool?: Pool | undefined;
  amount1?: string | undefined;
  amount2?: string | undefined;
};

export const useEstShareOfPool = ({
  pool,
  amount1,
  amount2,
}: Params): Response => {
  const estLpBalance = useTokensToLp({ pool, amount1, amount2 });
  const lpBalance = useBalance(pool?.lpTokenContract || "");
  const totalShare = num(pool?.total.share).plus(
    num(Number(estLpBalance)).times(ONE_TOKEN)
  );

  return useMemo(() => {
    if (pool == null || lpBalance == null) {
      return 0;
    }

    if (
      num(pool.total.share).eq(0) &&
      (num(Number(estLpBalance)).gt(0) ||
        num(amount1).gt(0) ||
        num(amount2).gt(0))
    ) {
      return 100;
    }

    if (num(Number(estLpBalance)).isNaN()) {
      return num(Number(pool?.mine.shareOfPool)).toNumber();
    }

    return num(Number(estLpBalance))
      .times(ONE_TOKEN)
      .plus(lpBalance)
      .times("100")
      .div(totalShare)
      .toNumber();
  }, [pool, amount1, lpBalance]);
};

export default useEstShareOfPool;
