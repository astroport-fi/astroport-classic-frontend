import { useMemo } from "react";
import { useQuery } from "react-query";
import { num, useTerraWebapp } from "@arthuryeti/terra";

import { SimulationResponse, useAstroswap } from "modules/common";
import { simulate as simulateMonoSwap } from "modules/swap/monoSwap";
import { useSwapRoute } from "modules/swap";
import { QUERY_STALE_TIME } from "constants/constants";

// token1 is the base token of stable type pool that price is calculated for
export const useStableTokenPrice = (token1: string, token2: string) => {
  const { client } = useTerraWebapp();
  const { tokenGraph } = useAstroswap();
  const swapRoute = useSwapRoute({
    tokenGraph,
    from: token1,
    to: token2,
  });

  const { data } = useQuery<unknown, unknown, SimulationResponse>(
    ["tokenPrice", token1],
    () => {
      return simulateMonoSwap({
        client,
        swapRoute,
        token: token1,
        amount: "100000",
        reverse: false,
      });
    },
    {
      enabled: swapRoute?.[0]?.type == "stable" && token1 != null,
      staleTime: QUERY_STALE_TIME,
    }
  );

  return useMemo(() => {
    if (!data) {
      return 0;
    }

    const price = num(data.return_amount)
      .plus(data.commission_amount)
      .div(10 ** 5)
      .toNumber();

    return num(price).dp(6).toNumber();
  }, [swapRoute, data]);
};

export default useStableTokenPrice;
