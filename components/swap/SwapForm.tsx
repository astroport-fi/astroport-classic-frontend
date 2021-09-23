import React, { FC } from "react";
import { useForm, FormProvider } from "react-hook-form";

import { DEFAULT_SLIPPAGE } from "constants/constants";
import { useSwap, SwapStep } from "modules/swap";
import { toAmount } from "libs/parse";
import useDebounceValue from "hooks/useDebounceValue";

import SwapFormInitial from "components/swap/SwapFormInitial";
import SwapFormConfirm from "components/swap/SwapFormConfirm";
import SwapFormSuccess from "components/swap/SwapFormSuccess";
import SwapFormError from "components/swap/SwapFormError";

type FormValues = {
  token1: {
    amount: string;
    asset: string;
  };
  token2: {
    amount: string;
    asset: string;
  };
};

const SwapForm: FC = () => {
  const methods = useForm<FormValues>({
    defaultValues: {
      token1: {
        amount: undefined,
        asset: "usdr",
      },
      token2: {
        amount: undefined,
        asset: "uusd",
      },
    },
  });
  const token1 = methods.watch("token1");
  const token2 = methods.watch("token2");

  const debouncedAmount1 = useDebounceValue(token1.amount, 500);
  const debouncedAmount2 = useDebounceValue(token2.amount, 500);

  const swapState = useSwap({
    token1: token1.asset,
    token2: token2.asset,
    amount1: toAmount(debouncedAmount1),
    amount2: toAmount(debouncedAmount2),
    slippage: String(DEFAULT_SLIPPAGE),
  });

  return (
    <FormProvider {...methods}>
      {swapState.step === SwapStep.Initial && (
        <SwapFormInitial
          token1={token1}
          token2={token2}
          swapState={swapState}
        />
      )}
      {swapState.step === SwapStep.Confirm && (
        <SwapFormConfirm from={token1} to={token2} swapState={swapState} />
      )}
      {swapState.step === SwapStep.Success && (
        <SwapFormSuccess from={token1} to={token2} swapState={swapState} />
      )}
      {swapState.step === SwapStep.Error && (
        <SwapFormError swapState={swapState} />
      )}
    </FormProvider>
  );
};

export default SwapForm;
