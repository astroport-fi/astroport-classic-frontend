import { useMemo } from "react";
import { num } from "@arthuryeti/terra";

import { useLpToTokens, Pool } from "modules/pool";
import { useTokenPriceInUstWithSimulate } from "modules/swap";
import { useBalance, useTokenInfo } from "modules/common";

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
  const { getDecimals } = useTokenInfo();
  const lpBalance = useBalance(pool.lpTokenContract);
  const token1Price = useTokenPriceInUstWithSimulate(pool.token1.asset);
  const token2Price = useTokenPriceInUstWithSimulate(pool.token2.asset);
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
      amount1 == null ||
      amount2 == null
    ) {
      return null;
    }

    const safeTokenAmount1 = tokenAmounts?.[pool.token1.asset] || "0";
    const safeTokenAmount2 = tokenAmounts?.[pool.token2.asset] || "0";

    const totalPrice1 = num(safeAmount1)
      .times(10 ** getDecimals(pool.token1.asset))
      .plus(safeTokenAmount1)
      .times(token1Price)
      .div(10 ** getDecimals(pool.token1.asset));

    const totalPrice2 = num(safeAmount2)
      .times(10 ** getDecimals(pool.token2.asset))
      .plus(safeTokenAmount2)
      .times(token2Price)
      .div(10 ** getDecimals(pool.token2.asset));

    return totalPrice1.plus(totalPrice2).dp(2).toNumber();
  }, [pool, amount1, amount2, token1Price, token2Price]);
};

export default useEstShareInUst;
