import { useMemo } from "react";
import { num } from "@arthuryeti/terra";

import { ONE_TOKEN, ESTIMATE_TOKEN } from "constants/constants";
import { useAstroswap } from "modules/common";
import { useSwapSimulate, useSwapRoute } from "modules/swap";

export const useTokenPriceInUst = (token: string | null) => {
  const { routes } = useAstroswap();
  const swapRoute = useSwapRoute({ routes, from: token, to: ESTIMATE_TOKEN });

  const data = useSwapSimulate({
    swapRoute,
    amount: String(ONE_TOKEN),
    token,
    reverse: false,
  });

  return useMemo(() => {
    if (token == "uusd") {
      return String(ONE_TOKEN);
    }

    if (data == null) {
      return "0";
    }

    return num("1").div(data.price).times(ONE_TOKEN).toFixed();
  }, [data, token]);
};

export default useTokenPriceInUst;
