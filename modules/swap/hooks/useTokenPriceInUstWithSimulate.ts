import { useMemo } from "react";
import num from "libs/num";
import { useAstroswap, useTokenInfo } from "modules/common";
import { useSwapRoute, useSwapSimulate } from "modules/swap";
import num from "libs/num";

export const useTokenPriceInUstWithSimulate = (token: string) => {
  const { tokenGraph } = useAstroswap();
  const { getDecimals } = useTokenInfo();
  const swapRoute = useSwapRoute({ tokenGraph, from: token, to: "uusd" });

  const simulate = useSwapSimulate({
    swapRoute,
    token,
    token2: "uusd",
    amount: num(10 ** getDecimals(token)).toString(),
    reverse: false,
  });

  return useMemo(() => {
    if (token == "uusd") {
      return 1;
    }

    if (simulate.amount == null) {
      return 0;
    }

    return num(simulate.amount)
      .plus(simulate.commission)
      .plus(simulate.spread)
      .div(10 ** 6)
      .dp(6)
      .toNumber();
  }, [token, simulate]);
};

export default useTokenPriceInUstWithSimulate;
