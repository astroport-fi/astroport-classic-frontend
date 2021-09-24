import React, { FC } from "react";
import { chakra } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";

import { FormStep } from "types/common";
import { DEFAULT_SLIPPAGE } from "constants/constants";
import { useSwap } from "modules/swap";
import { toAmount } from "libs/parse";
import useDebounceValue from "hooks/useDebounceValue";

import FormError from "components/common/FormError";
import FormSummary from "components/common/FormSummary";
import FormConfirmOrSuccess from "components/common/FormConfirmOrSuccess";
import SwapFormInitial from "components/swap/SwapFormInitial";

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
        asset: "uluna",
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

  const state = useSwap({
    token1: token1.asset,
    token2: token2.asset,
    amount1: toAmount(debouncedAmount1),
    amount2: toAmount(debouncedAmount2),
    slippage: String(DEFAULT_SLIPPAGE),
  });

  const { fee, step, resetForm, setStep, swap } = state;

  const submit = async () => {
    swap();
  };

  return (
    <FormProvider {...methods}>
      <chakra.form onSubmit={methods.handleSubmit(submit)} width="full">
        {step === FormStep.Initial && (
          <SwapFormInitial token1={token1} token2={token2} state={state} />
        )}

        {step === FormStep.Confirm && (
          <FormConfirmOrSuccess
            isConfirm
            fee={fee}
            actionLabel="Confirm Swap"
            contentComponent={
              <FormSummary
                label1="You are swapping from"
                label2="to"
                token1={token1}
                token2={token2}
              />
            }
            details={[{ label: "Price Impact", value: "0.02%" }]}
            onCloseClick={resetForm}
          />
        )}
      </chakra.form>

      {step === FormStep.Success && (
        <FormConfirmOrSuccess
          contentComponent={
            <FormSummary
              label1="You are swapping from"
              label2="to"
              token1={token1}
              token2={token2}
            />
          }
          details={[{ label: "Price Impact", value: "0.02%" }]}
          onCloseClick={resetForm}
        />
      )}

      {step === FormStep.Error && (
        <FormError
          content="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
            sed diam voluptua."
          onCloseClick={() => setStep(FormStep.Initial)}
          onClick={() => setStep(FormStep.Initial)}
        />
      )}
    </FormProvider>
  );
};

export default SwapForm;
