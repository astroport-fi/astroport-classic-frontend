import { useMemo } from "react";
import { num, TxStep, useAddress, useTransaction } from "@arthuryeti/terra";

import { useContracts, useAstroswap, Route } from "modules/common";
import { useSwapRoute, useSwapSimulate, minAmountReceive } from "modules/swap";
import { createSwapMsgs as createMultiSwapMsgs } from "modules/swap/multiSwap";
import { createSwapMsgs as createMonoSwapMsgs } from "modules/swap/monoSwap";

export type SwapState = {
  minReceive: any;
  error: any;
  fee: any;
  txHash?: string;
  txStep: TxStep;
  reset: () => void;
  swap: () => void;
};

type Params = {
  swapRoute: Route[] | null;
  simulated: any | null;
  token1: string | null;
  token2: string | null;
  amount1: string | null;
  amount2: string | null;
  slippage: string;
  reverse: boolean;
  onSuccess?: (txHash: string) => void;
  onError?: (txHash?: string) => void;
};

export const useSwap = ({
  swapRoute,
  simulated,
  token1,
  token2,
  amount1,
  amount2,
  slippage,
  reverse = false,
  onSuccess,
  onError,
}: Params) => {
  const address = useAddress();
  const { router } = useContracts();

  const minReceive = useMemo(() => {
    if (simulated == null || amount2 == "") {
      return null;
    }

    return minAmountReceive({
      amount: simulated.amount,
      maxSpread: slippage,
    });
  }, [simulated, slippage, amount2, reverse]);

  const msgs = useMemo(() => {
    if (
      swapRoute == null ||
      token1 == null ||
      amount1 == "" ||
      num(amount1).eq(0) ||
      simulated == null
    ) {
      return null;
    }

    if (swapRoute.length > 1) {
      return createMultiSwapMsgs(
        {
          token: token1,
          swapRoute,
          amount: amount1,
          minReceive,
          router,
        },
        address
      );
    }

    return createMonoSwapMsgs(
      {
        token: token1,
        swapRoute,
        amount: amount1,
        slippage,
        price: simulated.price,
      },
      address
    );
  }, [
    address,
    token1,
    amount1,
    simulated,
    slippage,
    swapRoute,
    minReceive,
    router,
  ]);

  const { submit, ...rest } = useTransaction({ msgs, onSuccess, onError });

  return {
    ...rest,
    minReceive,
    swap: submit,
  };
};

export default useSwap;
