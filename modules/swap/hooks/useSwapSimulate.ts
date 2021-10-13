import { useMemo } from "react";
import { useTerraWebapp, num } from "@arthuryeti/terra";
import { useQuery } from "react-query";

import {
  useContracts,
  ReverseSimulationResponse,
  MultiSimulationResponse,
  SimulationResponse,
  useAstroswap,
} from "modules/common";
import { useSwapRoute } from "modules/swap";
import { simulate as simulateMonoSwap } from "modules/swap/monoSwap";
import { simulate as simulateMultiSwap } from "modules/swap/multiSwap";

function isMultiSimulation(
  value:
    | ReverseSimulationResponse
    | SimulationResponse
    | MultiSimulationResponse
): value is MultiSimulationResponse {
  return value.hasOwnProperty("amount");
}

function isReverseSimulation(
  value: ReverseSimulationResponse | SimulationResponse
): value is ReverseSimulationResponse {
  return value.hasOwnProperty("offer_amount");
}

type Params = {
  token1: string | null;
  token2: string | null;
  amount: string | null;
  reverse: boolean;
};

export const useSwapSimulate = ({
  token1,
  token2,
  amount,
  reverse,
}: Params) => {
  const { client } = useTerraWebapp();
  const { routes } = useAstroswap();
  const contracts = useContracts();
  const swapRoute = useSwapRoute({ routes, token1, token2 });
  const router = contracts.router;

  const { data, isLoading } = useQuery<
    unknown,
    unknown,
    SimulationResponse | ReverseSimulationResponse | MultiSimulationResponse
  >(
    ["simulation", swapRoute, router, token1, amount, reverse],
    () => {
      if (swapRoute == null || token1 == null || amount == null) {
        return;
      }

      if (swapRoute.length > 1) {
        return simulateMultiSwap({
          client,
          swapRoute,
          router,
          token: token1,
          amount,
        });
      }

      return simulateMonoSwap({
        client,
        swapRoute,
        token: token1,
        amount,
        reverse,
      });
    },
    {
      enabled: swapRoute != null,
    }
  );

  return useMemo(() => {
    if (data == null || amount == null || isLoading) {
      return null;
    }

    if (isMultiSimulation(data)) {
      return {
        amount: data.amount,
        spread: "0",
        commission: "0",
        price: num(amount).div(data.amount).toFixed(6).toString(),
        price2: num("1")
          .div(num(amount).div(data.amount))
          .toFixed(6)
          .toString(),
      };
    }

    const spread = data.spread_amount;
    const commission = data.commission_amount;

    if (isReverseSimulation(data)) {
      return {
        amount: data.offer_amount,
        spread,
        commission,
        price: num(amount).div(data.offer_amount).toFixed(6).toString(),
        price2: num("1")
          .div(num(amount).div(data.offer_amount))
          .toFixed(6)
          .toString(),
      };
    }

    return {
      amount: data.return_amount,
      spread,
      commission,
      price: num(amount).div(data.return_amount).toFixed(6).toString(),
      price2: num("1")
        .div(num(amount).div(data.return_amount))
        .toFixed(6)
        .toString(),
    };
  }, [amount, data, isLoading]);
};

export default useSwapSimulate;
