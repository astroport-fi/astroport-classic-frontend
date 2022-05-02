import { useMemo } from "react";
import num from "libs/num";

import { Pool } from "modules/pool";
import { ONE_TOKEN } from "constants/constants";

type Response = number | null;

type Params = {
  pool?: Pool | undefined;
  amount1?: string | undefined;
  amount2?: string | undefined;
};

export const useTokensToLp = ({ pool, amount1, amount2 }: Params): Response => {
  return useMemo(() => {
    if (
      pool == null ||
      amount1 == "" ||
      num(amount1 || "").eq(0) ||
      amount2 == "null" ||
      num(amount2 || "").eq(0)
    ) {
      return null;
    }

    const { assets, total } = pool;
    const avg = num(assets ? assets[0].amount : "")
      .plus(assets ? assets[1].amount : "")
      .div(ONE_TOKEN)
      .div(2);
    const currentAvg = num(amount1)
      .plus(amount2 || "")
      .div(2);

    return currentAvg
      .times(num(total.share).div(ONE_TOKEN))
      .div(avg)
      .dp(2)
      .toNumber();
  }, [pool, amount1, amount2]);
};

export default useTokensToLp;
