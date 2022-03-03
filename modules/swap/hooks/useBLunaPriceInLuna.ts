import { useMemo } from "react";
import { useQuery } from "react-query";
import { num, useTerraWebapp } from "@arthuryeti/terra";

import { useAstroswap, useContracts } from "modules/common";
import { simulate as simulateMonoSwap } from "modules/swap/monoSwap";
import { useSwapRoute } from "modules/swap";

export const useBLunaPriceInLuna = () => {
  const { client } = useTerraWebapp();
  const { tokenGraph } = useAstroswap();
  const { bLunaToken } = useContracts();
  const swapRouteInLuna = useSwapRoute({
    tokenGraph,
    from: bLunaToken,
    to: "uluna",
  });

  // TODO: refactor to accept more stables
  const { data: bLunaData } = useQuery<unknown>(
    ["tokenPrice", bLunaToken],
    () => {
      return simulateMonoSwap({
        client,
        swapRoute: swapRouteInLuna,
        token: bLunaToken,
        amount: "100000",
        reverse: false,
      });
    },
    {
      enabled: swapRouteInLuna?.[0]?.type == "stable" && bLunaToken != null,
    }
  );

  return useMemo(() => {
    if (swapRouteInLuna?.length == 1) {
      // TODO: Create a proper hook for stable pool
      if (swapRouteInLuna[0].type == "stable" && bLunaData != null) {
        // @ts-expect-error
        const bLunaPrice = num(bLunaData.return_amount)
          // @ts-expect-error
          .plus(bLunaData.commission_amount)
          .div(10 ** 5)
          .toNumber();

        // const result = await simulateMonoSwap();
        return num(bLunaPrice).dp(6).toNumber();
      }
    }

    return 0;
  }, [swapRouteInLuna, bLunaData]);
};

export default useBLunaPriceInLuna;
