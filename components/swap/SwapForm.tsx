import React, { FC, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { chakra, Link, Text, useToast } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { TxStep, fromTerraAmount, num } from "@arthuryeti/terra";
import { StdFee } from "@terra-money/terra.js";

import { DEFAULT_SLIPPAGE } from "constants/constants";
import { useSwap } from "modules/swap";
import { useTokenInfo } from "modules/common";
import { toAmount } from "libs/parse";
import useDebounceValue from "hooks/useDebounceValue";

import FormError from "components/common/FormError";
import FormSummary from "components/common/FormSummary";
import FormConfirm from "components/common/FormConfirm";
import FormSuccess from "components/common/FormSuccess";
import SwapFormInitial from "components/swap/SwapFormInitial";
import FormLoading from "components/common/FormLoading";
import NotificationSuccess from "components/notifications/NotificationSuccess";

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
  const toast = useToast();
  const finder = useFinder();
  const { getSymbol } = useTokenInfo();
  const router = useRouter();
  const [slippage, setSlippage] = useState(DEFAULT_SLIPPAGE);
  const [expertMode, setExpertMode] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);
  const methods = useForm<FormValues>({
    defaultValues: {
      token1: {
        asset: router.query.from?.toString() || "uluna",
        amount: undefined,
      },
      token2: {
        asset: router.query.to?.toString() || "uusd",
        amount: undefined,
      },
    },
  });

  const { getValues, watch } = methods;

  const token1 = watch("token1");
  const token2 = watch("token2");

  useEffect(() => {
    router.push(`/?from=${token1.asset}&to=${token2.asset}`, undefined, {
      shallow: true,
    });
  }, [token1, token2]);

  const debouncedAmount1 = useDebounceValue(token1.amount, 200);

  const showNotification = (txHash: string) => {
    const { token1, token2 } = getValues();
    toast({
      position: "top-right",
      duration: 9000,
      render: ({ onClose }) => (
        <NotificationSuccess onClose={onClose}>
          <Text textStyle="medium">
            You swapped {token1.amount} {getSymbol(token1.asset)} for{" "}
            {token2.amount} {getSymbol(token2.asset)}
          </Text>
          <Link href={finder(txHash, "tx")} isExternal>
            <Text textStyle="medium" color="otherColours.overlay">
              View on Terra Finder
            </Text>
          </Link>
        </NotificationSuccess>
      ),
    });
  };

  const state = useSwap({
    token1: token1.asset,
    token2: token2.asset,
    amount: toAmount(debouncedAmount1),
    slippage: String(slippage),
    onSuccess: showNotification,
  });

  const { fee, txHash, txStep, reset, swap } = state;

  useEffect(() => {
    if (txStep == TxStep.Broadcasting) {
      setShowConfirm(false);
    }
  }, [txStep]);

  const resetForm = useCallback(() => {
    methods.reset();
    reset();
  }, [reset, methods]);

  const submit = async () => {
    swap();
  };

  const estimateFees = (fee?: StdFee | null) =>
    fromTerraAmount(String(fee?.gas), "0.[000]");

  const estimateExchangeRate = (simulated: any) =>
    `1 ${getSymbol(token2.asset)} = ${num(simulated.price).toPrecision(
      3
    )} ${getSymbol(token1.asset)}`;

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
        onCloseClick={resetForm}
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
            slippage={slippage}
            onSlippageChange={setSlippage}
            expertMode={expertMode}
            onExpertModeChange={setExpertMode}
            onClick={() => setShowConfirm(!expertMode)}
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
            details={[
              { label: "Price Impact", value: "0.02%" },
              {
                label: "Liquidity Provider fee",
                value: `${estimateFees(state.fee)} UST`,
              },
              {
                label: "Slippage Tolerance",
                value: `${slippage.toPrecision(1)}%`,
              },
              {
                label: "Exchange Rate",
                value: estimateExchangeRate(state.simulated),
              },
            ]}
            onCloseClick={() => setShowConfirm(false)}
          />
        )}
      </chakra.form>
    </FormProvider>
  );
};

export default SwapForm;
