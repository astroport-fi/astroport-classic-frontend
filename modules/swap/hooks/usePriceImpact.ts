import { useMemo } from "react";
import { num } from "@arthuryeti/terra";

import { useAstroswap } from "modules/common";
import { useSwapRoute } from "modules/swap";
import { getAssetAmountsInPool } from "libs/terra";

import { useGetPool } from "modules/pool";

type Params = {
  from: string;
  to: string;
  price: string;
};

export function usePriceImpact({ from, to, price }: Params) {
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

    if (swapRoute.length == 1) {
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
