import { useMemo } from "react";
import { num } from "@arthuryeti/terra";

import { getTokenDenom, PoolResponse } from "modules/common";
import { useLpToTokens } from "modules/pool";
import { useTokenPriceInUst } from "modules/swap";
import { ONE_TOKEN } from "constants/constants";

type Params = {
  pool: PoolResponse | undefined | null;
  amount: string | undefined | null;
};

export const useShareInUst = ({ pool, amount }: Params) => {
  const token1 = useMemo(() => {
    if (pool == null) {
      return null;
    }

    return getTokenDenom(pool.assets[0].info);
  }, [pool]);

  const token2 = useMemo(() => {
    if (pool == null) {
      return null;
    }

    return getTokenDenom(pool.assets[1].info);
  }, [pool]);

  const token1Price = useTokenPriceInUst(token1);
  const token2Price = useTokenPriceInUst(token2);

  const tokenAmounts = useLpToTokens({
    pool,
    amount,
  });

  return useMemo(() => {
    if (
      pool == null ||
      token1 == null ||
      token2 == null ||
      token1Price == null ||
      token2Price == null ||
      tokenAmounts == null ||
      amount == null ||
      num(amount).isEqualTo(0)
    ) {
      return null;
    }

    const totalPrice1 = num(tokenAmounts[token1])
      .times(token1Price)
      .div(ONE_TOKEN);
    const totalPrice2 = num(tokenAmounts[token2])
      .times(token2Price)
      .div(ONE_TOKEN);

    return totalPrice1.plus(totalPrice2).dp(2).toNumber();
  }, [pool, amount, token1, token2, token1Price, token2Price, tokenAmounts]);
};

export default useShareInUst;
