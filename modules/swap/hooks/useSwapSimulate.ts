import { useMemo } from "react";
import { useTerraWebapp, num } from "@arthuryeti/terra";
import { useQuery } from "react-query";

import {
  useContracts,
  Route,
  SimulationResponse,
  ReverseSimulationResponse,
  MultiSimulationResponse,
} from "modules/common";
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
  swapRoute: Route[] | null;
  token: string | null;
  amount: string | null;
  reverse: boolean;
  onSuccess?: (item: any) => void;
  onError?: (item: any) => void;
};

export const useSwapSimulate = ({
  swapRoute,
  token,
  amount,
  reverse,
  onSuccess,
  onError,
}: Params) => {
  const { client } = useTerraWebapp();
  const { router } = useContracts();
  const isQueryEnabled = !num(amount).isNaN() && swapRoute != null;

  const { data, isLoading } = useQuery<
    unknown,
    unknown,
    SimulationResponse | ReverseSimulationResponse | MultiSimulationResponse
  >(
    ["simulation", swapRoute, router, token, amount, reverse],
    () => {
      if (
        swapRoute == null ||
        token == null ||
        amount == "" ||
        num(amount).eq(0) ||
        num(amount).isNaN() ||
        swapRoute.length == 0
      ) {
        return;
      }

      if (swapRoute.length > 1) {
        return simulateMultiSwap({
          client,
          swapRoute,
          router,
          token,
          amount,
        });
      }

      return simulateMonoSwap({
        client,
        swapRoute,
        token,
        amount,
        reverse,
      });
    },
    {
      enabled: isQueryEnabled,
      refetchOnWindowFocus: false,
      retry: false,
      onError,
    }
  );

  return useMemo(() => {
    if (isLoading) {
      return {
        isLoading: true,
        amount: null,
        spread: null,
        commission: null,
        price: null,
      };
    }

    if (data == null || amount == "" || num(amount).eq(0)) {
      return {
        isLoading: false,
        amount: null,
        spread: null,
        commission: null,
        price: null,
      };
    }

    if (isMultiSimulation(data)) {
      const result = {
        isLoading: false,
        amount: data.amount,
        spread: "0",
        commission: "0",
        price: num(amount).div(data.amount).toFixed(18),
      };

      onSuccess?.(result);
      return result;
    }

    const spread = data.spread_amount;
    const commission = data.commission_amount;

    if (isReverseSimulation(data)) {
      const result = {
        isLoading: false,
        amount: data.offer_amount,
        spread,
        commission,
        price: num(data.offer_amount).div(amount).toFixed(18),
      };

      onSuccess?.(result);
      return result;
    }

    const result = {
      isLoading: false,
      amount: data.return_amount,
      spread,
      commission,
      price: num(amount).div(data.return_amount).toFixed(18),
    };

    onSuccess?.(result);
    return result;
  }, [amount, data, isLoading]);
};

export default useSwapSimulate;
