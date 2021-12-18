import { useMemo } from "react";
import { num } from "@arthuryeti/terra";

import { ONE_TOKEN, ESTIMATE_TOKEN } from "constants/constants";
import { useAstroswap } from "modules/common";
import { useSwapSimulate, useSwapRoute } from "modules/swap";
import { useGetPool } from "modules/pool";
import { getAssetAmountsInPool } from "libs/terra";

export const useTokenPriceInUst = (token: string | null) => {
  const { routes } = useAstroswap();
  const swapRoute = useSwapRoute({ routes, from: token, to: ESTIMATE_TOKEN });

  console.log("token", token);
  console.log(swapRoute?.[0]?.contract_addr);

  const { data } = useGetPool(swapRoute?.[0]?.contract_addr);

  return useMemo(() => {
    if (token == "uusd") {
      return 1;
    }

    if (swapRoute == null || data == null) {
      return 0;
    }

    if (swapRoute.length == 1) {
      const { token1, token2 } = getAssetAmountsInPool(data.assets, "uusd");

      return num(token1).div(token2).dp(6).toNumber();
    }

    return 0;
  }, [data, token]);
};

export default useTokenPriceInUst;
