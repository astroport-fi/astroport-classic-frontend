import React, { FC, useState, useEffect } from "react";
import { chakra } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { TxStep } from "@arthuryeti/terra";

import { DEFAULT_SLIPPAGE } from "constants/constants";
import { useSwap } from "modules/swap";
import { toAmount } from "libs/parse";
import useDebounceValue from "hooks/useDebounceValue";

import FormError from "components/common/FormError";
import FormSummary from "components/common/FormSummary";
import FormConfirm from "components/common/FormConfirm";
import FormSuccess from "components/common/FormSuccess";
import SwapFormInitial from "components/swap/SwapFormInitial";
import FormLoading from "components/common/FormLoading";

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

const defaultValues = {
  token1: {
    amount: undefined,
    asset: "uluna",
  },
  token2: {
    amount: undefined,
    asset: "uusd",
  },
};

const SwapForm: FC = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const methods = useForm<FormValues>({
    defaultValues,
  });
  const token1 = methods.watch("token1");
  const token2 = methods.watch("token2");

  const debouncedAmount1 = useDebounceValue(token1.amount, 200);

  const state = useSwap({
    token1: token1.asset,
    token2: token2.asset,
    amount: toAmount(debouncedAmount1),
    slippage: String(DEFAULT_SLIPPAGE),
  });

  const { fee, txHash, txStep, reset, swap } = state;

  useEffect(() => {
    if (txStep == TxStep.Broadcasting) {
      setShowConfirm(false);
    }
  }, [txStep]);

  const submit = async () => {
    swap();
  };

  if (txStep == TxStep.Broadcasting || txStep == TxStep.Posting) {
    return <FormLoading txHash={txHash} />;
  }

  if (txStep == TxStep.Success) {
    return (
      <FormSuccess
        contentComponent={
          <FormSummary
            label1="You swapped from"
            label2="You received:"
            token1={token1}
            token2={token2}
          />
        }
        details={[{ label: "Price Impact", value: "0.02%" }]}
        onCloseClick={reset}
      />
    );
  }

  if (txStep == TxStep.Failed) {
    return (
      <FormError
        content="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
        nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
        sed diam voluptua."
        onCloseClick={reset}
        onClick={reset}
      />
    );
  }

  return (
    <FormProvider {...methods}>
      <chakra.form onSubmit={methods.handleSubmit(submit)} width="full">
        {!showConfirm && (
          <SwapFormInitial
            token1={token1}
            token2={token2}
            state={state}
            onClick={() => setShowConfirm(true)}
          />
        )}

        {showConfirm && (
          <FormConfirm
            fee={fee}
            actionLabel="Confirm Swap"
            contentComponent={
              <FormSummary
                label1="You are swapping from"
                label2="You are swapping to"
                token1={token1}
                token2={token2}
              />
            }
            details={[{ label: "Price Impact", value: "0.02%" }]}
            onCloseClick={() => setShowConfirm(false)}
          />
        )}
      </chakra.form>
    </FormProvider>
  );
};

export default SwapForm;
