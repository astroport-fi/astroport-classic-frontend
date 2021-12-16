import { useMemo } from "react";
import { num, toTerraAmount } from "@arthuryeti/terra";

import { useAstroswap } from "modules/common";
import {
  useTokenPriceInUst,
  useSwapSimulate,
  useSwapRoute,
} from "modules/swap";

type Token = {
  amount: string;
  asset: string;
};

type Params = {
  token1: Token;
  token2: Token;
};

export function usePriceImpact({ token1, token2 }: Params) {
  const { routes } = useAstroswap();
  const swapRoute = useSwapRoute({
    routes,
    from: token1.asset,
    to: token2.asset,
  });

  console.log({
    from: token1.asset,
    to: token2.asset,
  });

  const token2PriceInUst = useTokenPriceInUst(token2.asset);

  const result = useSwapSimulate({
    swapRoute,
    amount: toTerraAmount(token1.amount),
    token: token1.asset,
    reverse: false,
  });

  return useMemo(() => {
    if (result == null) {
      return null;
    }

    const newToken2PriceInUst = toTerraAmount(result?.price);

    return num(newToken2PriceInUst)
      .minus(token2PriceInUst)
      .abs()
      .div(token2PriceInUst)
      .times(100)
      .toNumber();
  }, [result, token2PriceInUst]);
}

export default usePriceImpact;
