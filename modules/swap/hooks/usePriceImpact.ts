import { useMemo } from "react";
import { useQuery } from "react-query";
import { num, useTerraWebapp } from "@arthuryeti/terra";

import { useAstroswap, useTokenInfo } from "modules/common";
import { simulate as simulateMonoSwap } from "modules/swap/monoSwap";
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
  const { client } = useTerraWebapp();
  const { routes } = useAstroswap();
  const { getDecimals } = useTokenInfo();
  const swapRoute = useSwapRoute({
    routes,
    from,
    to,
  });

  const fromDecimals = getDecimals(from);
  const toDecimals = getDecimals(to);

  const { data } = useGetPool(swapRoute?.[0]?.contract_addr);

  const { data: bLunaData } = useQuery<unknown>(
    ["priceImpact", from],
    () => {
      return simulateMonoSwap({
        client,
        swapRoute: swapRoute,
        token: to,
        amount: "1000000",
        reverse: false,
      });
    },
    {
      enabled: swapRoute?.[0]?.type == "stable" && from != null,
    }
  );

  return useMemo(() => {
    if (swapRoute == null || data == null || price == null) {
      return 0;
    }

    if (swapRoute.length == 1 && swapRoute[0].type == "stable") {
      // @ts-expect-error
      const bLunaPrice = num(bLunaData.return_amount)
        // @ts-expect-error
        .plus(bLunaData.commission_amount)
        .div(10 ** 6)
        .toNumber();

      return num(bLunaPrice)
        .minus(price)
        .div(price)
        .abs()
        .times(100)
        .dp(2)
        .toNumber();
    }

    if (swapRoute.length == 1 && swapRoute[0].type == "xyk") {
      const { token1, token2 } = getAssetAmountsInPool(data.assets, to);
      const poolPrice = num(token2)
        .div(10 ** fromDecimals)
        .div(num(token1).div(10 ** toDecimals))
        .dp(18)
        .toNumber();

      return num(price)
        .minus(poolPrice)
        .div(poolPrice)
        .times(100)
        .dp(2)
        .toNumber();
    }

    return 0;
  }, [data, price, bLunaData]);
}

export default usePriceImpact;
