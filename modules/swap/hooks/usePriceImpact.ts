import { useMemo } from "react";
import num from "libs/num";

import {
  useAstroswap,
  useTokenInfo,
  useStableTokenPrice,
} from "modules/common";
import { useSwapRoute } from "modules/swap";
import { getAssetAmountsInPool } from "libs/terra";

import useGetPools from "modules/pool/hooks/useGetPools";
import BigNumber from "bignumber.js";

type Params = {
  from: string;
  to: string;
  price?: string | null;
};

export function usePriceImpact({ from, to, price }: Params): number | null {
  const { tokenGraph } = useAstroswap();
  const { getDecimals } = useTokenInfo();
  const swapRoute = useSwapRoute({ tokenGraph, from, to });
  const stableTokenPrice = useStableTokenPrice(from, to);

  const fromDecimals = getDecimals(from);
  const toDecimals = getDecimals(to);

  const pools = useGetPools(
    swapRoute ? swapRoute.map((sri) => sri?.contract_addr) : []
  );

  return useMemo(() => {
    if (
      swapRoute == null ||
      pools == null ||
      swapRoute.length !== 1 ||
      swapRoute.length !== pools.length ||
      price == null
    ) {
      return 0;
    }

    // stable pool
    if (swapRoute[0]?.type == "stable" && stableTokenPrice != 0) {
      return num(1)
        .minus(num(stableTokenPrice).div(price))
        .times(100)
        .dp(2, BigNumber.ROUND_HALF_UP)
        .abs()
        .toNumber();
    }

    // xyk pool
    if (swapRoute[0]?.type == "xyk") {
      const { token1, token2 } = getAssetAmountsInPool(pools[0]?.assets, to);
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
  }, [pools, price, stableTokenPrice]);
}

export default usePriceImpact;
