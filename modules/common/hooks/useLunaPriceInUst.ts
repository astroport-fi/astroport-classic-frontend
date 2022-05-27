import { useMemo } from "react";
import num from "libs/num";

import { useAstroswap } from "modules/common";
import { useSwapRoute } from "modules/swap";
import { useGetPool } from "modules/pool";
import { getAssetAmountsInPool } from "libs/terra";

export const useLunaPriceInUst = () => {
  const { tokenGraph } = useAstroswap();
  const swapRouteInUst = useSwapRoute({
    tokenGraph,
    from: "uluna",
    to: "uusd",
  });

  const { data: ustData } = useGetPool(swapRouteInUst?.[0]?.contract_addr);

  return useMemo(() => {
    if (swapRouteInUst == null || ustData == null) {
      return 0;
    }

    if (swapRouteInUst.length == 1) {
      const { token1, token2 } = getAssetAmountsInPool(ustData.assets, "uusd");

      if (num(token1).eq(0) || num(token2).eq(0)) {
        return 0;
      }

      return num(token1).div(token2).dp(6).toNumber();
    }

    return 0;
  }, [ustData, swapRouteInUst]);
};

export default useLunaPriceInUst;
