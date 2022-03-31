import { useMemo } from "react";
import { useQuery } from "react-query";
import { num, useTerraWebapp } from "@arthuryeti/terra";

import { useAstroswap, useTokenInfo } from "modules/common";
import { simulate as simulateMonoSwap } from "modules/swap/monoSwap";
import { useSwapRoute } from "modules/swap";
import { getAssetAmountsInPool } from "libs/terra";

import useGetPools from "modules/pool/hooks/useGetPools";
import BigNumber from "bignumber.js";
import { QUERY_STALE_TIME } from "constants/constants";

type Params = {
  from: string;
  amount1: string;
  to: string;
  amount2: string;
  price: string;
};

export function usePriceImpact({ from, to, amount1, amount2, price }: Params) {
  const { client } = useTerraWebapp();
  const { tokenGraph } = useAstroswap();
  const { getDecimals } = useTokenInfo();
  const swapRoute = useSwapRoute({
    tokenGraph,
    from,
    to,
  });

  const fromDecimals = getDecimals(from);
  const toDecimals = getDecimals(to);

  const pools = useGetPools(swapRoute?.map((sri) => sri?.contract_addr));

  const { data: bLunaData } = useQuery<unknown>(
    ["priceImpact", from],
    () => {
      return simulateMonoSwap({
        client,
        swapRoute: swapRoute,
        token: to,
        amount: "100000",
        reverse: false,
      });
    },
    {
      enabled: swapRoute?.[0]?.type == "stable" && from != null,
      staleTime: QUERY_STALE_TIME,
    }
  );

  return useMemo(() => {
    if (
      swapRoute == null ||
      pools == null ||
      swapRoute.length !== pools.length ||
      price == null
    ) {
      return 0;
    }

    // TODO: Create a proper hook for stable pool
    if (
      swapRoute.length == 1 &&
      swapRoute[0].type == "stable" &&
      bLunaData != null
    ) {
      // @ts-expect-error
      const bLunaPrice = num(bLunaData.return_amount)
        // @ts-expect-error
        .plus(bLunaData.commission_amount)
        .div(10 ** 5)
        .toNumber();

      return num(1)
        .minus(num(bLunaPrice).div(price))
        .times(100)
        .dp(2, BigNumber.ROUND_HALF_UP)
        .toNumber();
    }

    if (swapRoute.length == 1 && swapRoute[0].type == "xyk") {
      const { token1, token2 } = getAssetAmountsInPool(pools[0].assets, to);
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

    if (swapRoute.length > 1) {
      const poolPrices = swapRoute.map((sri, index) => {
        const { token1, token2 } = getAssetAmountsInPool(
          pools[index].assets,
          sri.to
        );
        return num(token2)
          .div(10 ** fromDecimals)
          .div(num(token1).div(10 ** toDecimals))
          .dp(18)
          .toNumber();
      });

      const combinedPoolPrices = poolPrices.reduce((p, c) => p * c);
      return num(price)
        .minus(combinedPoolPrices)
        .div(combinedPoolPrices)
        .times(100)
        .dp(2)
        .toNumber();
    }

    return 0;
  }, [pools, price, bLunaData]);
}

export default usePriceImpact;
