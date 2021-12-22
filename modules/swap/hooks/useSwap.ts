import { useMemo } from "react";
import { num, TxStep, useAddress, useTransaction } from "@arthuryeti/terra";

import { useContracts, useAstroswap, Route } from "modules/common";
import { useSwapRoute, useSwapSimulate, minAmountReceive } from "modules/swap";
import { createSwapMsgs as createMultiSwapMsgs } from "modules/swap/multiSwap";
import { createSwapMsgs as createMonoSwapMsgs } from "modules/swap/monoSwap";
import { TxInfo } from "@terra-money/terra.js";

export type SwapState = {
  minReceive: any;
  error: any;
  fee: any;
  txHash?: string;
  txStep: TxStep;
  reset: () => void;
  submit: () => void;
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
  onBroadcasting?: (txHash: string) => void;
  onSuccess?: (txHash: string, txInfo?: TxInfo) => void;
  onError?: (txHash?: string, txInfo?: TxInfo) => void;
};

export const useSwap = ({
  swapRoute,
  simulated,
  token1,
  amount1,
  amount2,
  slippage,
  reverse = false,
  onBroadcasting,
  onSuccess,
  onError,
}: Params) => {
  const address = useAddress();
  const { router } = useContracts();

  const minReceive = useMemo(() => {
    if (amount2 == "") {
      return null;
    }

    return minAmountReceive({
      amount: amount2,
      maxSpread: slippage,
    });
  }, [slippage, amount2]);

  const msgs = useMemo(() => {
    if (
      swapRoute == null ||
      token1 == null ||
      amount1 == "" ||
      num(amount1).eq(0) ||
      simulated.isLoading ||
      simulated.amount == null
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
        price: reverse ? simulated.price2 : simulated.price,
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
    reverse,
    minReceive,
    router,
  ]);

  const rest = useTransaction({ msgs, onBroadcasting, onSuccess, onError });

  return useMemo(() => {
    return {
      ...rest,
      minReceive,
    };
  }, [rest, minReceive]);
};

export default useSwap;
