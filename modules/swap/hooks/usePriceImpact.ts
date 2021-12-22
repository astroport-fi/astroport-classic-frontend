import { useMemo } from "react";
import { num } from "@arthuryeti/terra";

import { useAstroswap } from "modules/common";
import { useSwapRoute } from "modules/swap";
import { getAssetAmountsInPool } from "libs/terra";

import { useGetPool } from "modules/pool";

type Params = {
  from: string;
  amount1: string;
  to: string;
  amount2: string;
  price: string;
};

export function usePriceImpact({ from, to, amount1, amount2, price }: Params) {
  const { routes } = useAstroswap();
  const swapRoute = useSwapRoute({
    routes,
    from,
    to,
  });

  const { data } = useGetPool(swapRoute?.[0]?.contract_addr);

  return useMemo(() => {
    if (swapRoute == null || data == null || price == null) {
      return 0;
    }

    if (swapRoute.length == 1 && swapRoute[0].type == "stable") {
      return num(amount1)
        .minus(amount2)
        .div(amount1)
        .abs()
        .times(100)
        .dp(2)
        .toNumber();
    }

    if (swapRoute.length == 1 && swapRoute[0].type == "xyk") {
      const { token1, token2 } = getAssetAmountsInPool(data.assets, to);
      const poolPrice = num(token1).div(token2).dp(6).toNumber();

      return num(poolPrice)
        .minus(price)
        .div(poolPrice)
        .times(100)
        .dp(2)
        .toNumber();
    }

    return 0;
  }, [data, price]);
}

export default usePriceImpact;
