import { useMemo } from "react";
import { num } from "@arthuryeti/terra";
import { getTokenDenom, PoolResponse, useTokenInfo } from "modules/common";
import { useLpToTokens } from "modules/pool";
import { useTokenPriceInUstWithSimulate } from "modules/swap";

type Params = {
  pool?: PoolResponse | undefined;
  amount?: string | undefined;
};

export const useShareInUst = ({ pool, amount }: Params) => {
  const { getDecimals } = useTokenInfo();
  const token1 = useMemo(() => {
    if (pool == null) {
      return null;
    }

    return getTokenDenom(pool.assets ? pool.assets[0].info : undefined);
  }, [pool]);

  const token2 = useMemo(() => {
    if (pool == null) {
      return null;
    }

    return getTokenDenom(pool.assets ? pool.assets[1].info : undefined);
  }, [pool]);

  const token1Price = useTokenPriceInUstWithSimulate(token1 || "");
  const token2Price = useTokenPriceInUstWithSimulate(token2 || "");

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
      num(amount).eq(0)
    ) {
      return 0;
    }

    const totalPrice1 = num(tokenAmounts[token1])
      .times(token1Price)
      .div(10 ** getDecimals(token1));
    const totalPrice2 = num(tokenAmounts[token2])
      .times(token2Price)
      .div(10 ** getDecimals(token2));

    return totalPrice1.plus(totalPrice2).dp(2).toNumber();
  }, [pool, amount, token1, token2, token1Price, token2Price, tokenAmounts]);
};

export default useShareInUst;
