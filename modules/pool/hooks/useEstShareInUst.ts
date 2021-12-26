import { useMemo } from "react";
import { num, useBalance } from "@arthuryeti/terra";

import { useShareInUst, Pool } from "modules/pool";
import { ONE_TOKEN } from "constants/constants";
import { useTokenPriceInUst } from "modules/swap";
import useLpToTokens from "./useLpToTokens";

type Response = number | null;

type Params = {
  pool: Pool | null | undefined;
  amount1: string | null;
  amount2: string | null;
};

export const useEstShareInUst = ({
  pool,
  amount1,
  amount2,
}: Params): Response => {
  const lpBalance = useBalance(pool.lpTokenContract);
  const token1Price = useTokenPriceInUst(pool.token1.asset);
  const token2Price = useTokenPriceInUst(pool.token2.asset);
  const safeAmount1 = amount1 || "0";
  const safeAmount2 = amount2 || "0";

  const tokenAmounts = useLpToTokens({
    pool: {
      ...pool,
      total_share: pool.total.share,
    },
    amount: lpBalance,
  });

  return useMemo(() => {
    if (
      pool == null ||
      token1Price == null ||
      token2Price == null ||
      // tokenAmounts == null ||
      amount1 == null ||
      amount2 == null
    ) {
      return null;
    }

    const safeTokenAmount1 = tokenAmounts?.[pool.token1.asset] || "0";
    const safeTokenAmount2 = tokenAmounts?.[pool.token2.asset] || "0";

    const totalPrice1 = num(safeAmount1)
      .times(ONE_TOKEN)
      .plus(safeTokenAmount1)
      .times(token1Price)
      .div(ONE_TOKEN);
    const totalPrice2 = num(safeAmount2)
      .times(ONE_TOKEN)
      .plus(safeTokenAmount2)
      .times(token2Price)
      .div(ONE_TOKEN);

    return totalPrice1.plus(totalPrice2).dp(2).toNumber();
  }, [pool, amount1, amount2, token1Price, token2Price]);
};

export default useEstShareInUst;
