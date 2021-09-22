import { useCallback, useState, useMemo, useEffect } from "react";
import {
  isValidAmount,
  useAddress,
  useTransaction,
  useTerra,
} from "@arthuryeti/terra";
import {
  findSwapRoute,
  calculateMinimumReceive,
  useSimulation,
  createSwapMsgs,
} from "modules/swap";
import { StdFee } from "@terra-money/terra.js";
import { TxResult } from "@terra-dev/wallet-types";

import { ONE_TOKEN } from "constants/constants";
import networks from "constants/networks";

export enum SwapStep {
  Initial = 1,
  Confirm = 2,
  Pending = 3,
  Success = 4,
  Error = 5,
}

type Params = {
  token1: string;
  amount1: string;
  token2: string;
  amount2: string;
  slippage: string;
};

export type SwapState = {
  setStep: (a: SwapStep) => void;
  step: SwapStep;
  isReverse: boolean;
  toggleIsReverse: () => void;
  resetSwap: () => void;
  isReady: boolean;
  minimumReceive: string;
  result: TxResult;
  error: string;
  fee: StdFee;
  swap: () => void;
  exchangeRate: string;
};

export const useSwap = ({
  token1,
  token2,
  amount1,
  slippage,
}: Params): SwapState => {
  const [step, setStep] = useState<SwapStep>(SwapStep.Initial);
  const [isReverse, setIsReverse] = useState<boolean>(false);
  const {
    networkInfo: { name },
    routes,
  } = useTerra();
  const address = useAddress();
  const { routeContract } = networks[name];

  const { amount: exchangeRate } = useSimulation(
    token1,
    token2,
    String(ONE_TOKEN)
  );
  const { amount } = useSimulation(token1, token2, amount1);

  const swapRoute = useMemo(
    () => findSwapRoute(routes, token1, token2),
    [routes, token1, token2]
  );

  const minimumReceive = useMemo(() => {
    if (!isValidAmount(amount)) {
      return null;
    }

    return calculateMinimumReceive(amount, slippage);
  }, [amount, slippage]);

  const msgs = useMemo(() => {
    if (!isValidAmount(amount1) || !minimumReceive || !swapRoute) {
      return;
    }

    return createSwapMsgs(
      {
        token1,
        route: swapRoute,
        amount: amount1,
        slippage,
        minimumReceive,
        routeContract,
      },
      address
    );
  }, [
    address,
    token1,
    amount1,
    minimumReceive,
    slippage,
    routeContract,
    swapRoute,
  ]);

  const toggleIsReverse = useCallback(() => {
    setIsReverse(!isReverse);
  }, [isReverse]);

  const { fee, submit, result, error, reset } = useTransaction({
    msgs,
  });

  const resetSwap = useCallback(() => {
    reset();
    setStep(SwapStep.Initial);
  }, [reset]);

  useEffect(() => {
    if (step === SwapStep.Confirm) {
      if (result?.success) {
        setStep(SwapStep.Success);
      }

      if (error) {
        setStep(SwapStep.Error);
      }
    }
  }, [result, error, step]);

  const isReady = !!minimumReceive && !!exchangeRate && !!fee;

  return {
    setStep,
    step,
    isReverse,
    toggleIsReverse,
    resetSwap,
    isReady,
    minimumReceive,
    result,
    error,
    fee,
    swap: submit,
    exchangeRate,
  };
};

export default useSwap;
