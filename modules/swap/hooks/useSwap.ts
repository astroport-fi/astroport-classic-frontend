import { useMemo } from "react";
import { num, TxStep, useAddress, useTransaction } from "@arthuryeti/terra";

import { useContracts, useAstroswap } from "modules/common";
import { useSwapRoute, useSwapSimulate, minAmountReceive } from "modules/swap";
import { createSwapMsgs as createMultiSwapMsgs } from "modules/swap/multiSwap";
import { createSwapMsgs as createMonoSwapMsgs } from "modules/swap/monoSwap";

export type SwapState = {
  simulated: any;
  minReceive: any;
  error: any;
  fee: any;
  txHash?: string;
  txStep: TxStep;
  reset: () => void;
  swap: () => void;
};

type Params = {
  token1: string | null;
  token2: string | null;
  amount: string | null;
  slippage: string;
  onSuccess?: (txHash: string) => void;
  onError?: (txHash?: string) => void;
};

export const useSwap = ({
  token1,
  token2,
  amount,
  slippage,
  onSuccess,
  onError,
}: Params) => {
  const { routes } = useAstroswap();
  const address = useAddress();
  const contracts = useContracts();
  const swapRoute = useSwapRoute({ routes, token1, token2 });
  const router = contracts.router;

  const simulated = useSwapSimulate({
    amount: amount ?? "1000000",
    token1,
    token2,
    reverse: false,
  });

  const minReceive = useMemo(() => {
    if (simulated == null) {
      return null;
    }

    return minAmountReceive({
      amount: simulated.amount,
      maxSpread: slippage,
    });
  }, [simulated, slippage]);

  const msgs = useMemo(() => {
    if (
      swapRoute == null ||
      token1 == null ||
      token2 == null ||
      amount == null ||
      num(amount).eq(0) ||
      simulated == null
    ) {
      return null;
    }

    if (swapRoute.length > 1) {
      return createMultiSwapMsgs(
        {
          token: token1,
          swapRoute,
          amount,
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
        amount,
        slippage,
        price: simulated.price,
      },
      address
    );
  }, [
    address,
    token1,
    token2,
    amount,
    simulated,
    minReceive,
    slippage,
    router,
    swapRoute,
  ]);

  const { submit, ...rest } = useTransaction({ msgs, onSuccess, onError });

  return {
    ...rest,
    simulated,
    minReceive,
    swap: submit,
  };
};

export default useSwap;
