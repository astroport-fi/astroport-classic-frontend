import { useMemo, useEffect } from "react";
import { useQuery } from "react-query";
import { num, useTerraWebapp } from "@arthuryeti/terra";

import { ONE_TOKEN } from "constants/constants";
import {
  SimulationResponse,
  useAstroswap,
  useLunaPriceInUst,
  useTokenInfo,
} from "modules/common";
import { simulate as simulateMonoSwap } from "modules/swap/monoSwap";
import { useSwapRoute } from "modules/swap";
import { useGetPool } from "modules/pool";
import { getAssetAmountsInPool } from "libs/terra";

export const useTokenPriceInUst = (token: string | null) => {
  const { client } = useTerraWebapp();
  const { routes } = useAstroswap();
  const { getDecimals } = useTokenInfo();
  const lunaPrice = useLunaPriceInUst();
  const swapRouteInUst = useSwapRoute({ routes, from: token, to: "uusd" });
  const swapRouteInLuna = useSwapRoute({ routes, from: token, to: "uluna" });

  const { data: ustData } = useGetPool(swapRouteInUst?.[0]?.contract_addr);
  const { data: lunaData } = useGetPool(swapRouteInLuna?.[0]?.contract_addr);
  // TODO: refactor to accept more stables
  const { data: bLunaData } = useQuery<unknown>(
    ["tokenPrice", token],
    () => {
      return simulateMonoSwap({
        client,
        swapRoute: swapRouteInLuna,
        token,
        amount: "1000000",
        reverse: false,
      });
    },
    {
      enabled: swapRouteInLuna?.[0]?.type == "stable" && token != null,
    }
  );

  useEffect(() => {}, [swapRouteInLuna]);

  return useMemo(() => {
    if (token == "uusd") {
      return 1;
    }

    if (
      (swapRouteInUst == null && swapRouteInLuna == null) ||
      (ustData == null && lunaData == null)
    ) {
      return 0;
    }

    if (swapRouteInUst.length == 1) {
      const { token1, token2 } = getAssetAmountsInPool(ustData.assets, "uusd");

      if (num(token1).eq(0) || num(token2).eq(0)) {
        return 0;
      }

      const token1amount = num(token1).div(num(10).pow(6));
      const token2amount = num(token2).div(num(10).pow(getDecimals(token)));

      return num(token1amount).div(token2amount).dp(6).toNumber();
    }

    if (swapRouteInLuna.length == 1) {
      const { token1, token2 } = getAssetAmountsInPool(
        lunaData.assets,
        "uluna"
      );

      if (swapRouteInLuna[0].type == "stable" && bLunaData != null) {
        // @ts-expect-error
        const bLunaPrice = num(bLunaData.return_amount)
          // @ts-expect-error
          .plus(bLunaData.commission_amount)
          .div(10 ** 6)
          .toNumber();

        // const result = await simulateMonoSwap();
        return num(bLunaPrice).times(lunaPrice).dp(6).toNumber();
      }

      if (num(token1).eq(0) || num(token2).eq(0)) {
        return 0;
      }

      const lunaInUst = num(token1)
        .div(ONE_TOKEN)
        .times(lunaPrice)
        .dp(6)
        .toNumber();

      return num(lunaInUst).div(num(token2).div(ONE_TOKEN)).dp(6).toNumber();
    }

    return 0;
  }, [
    ustData,
    lunaPrice,
    swapRouteInUst,
    swapRouteInLuna,
    token,
    lunaData,
    bLunaData,
  ]);
};

export default useTokenPriceInUst;
