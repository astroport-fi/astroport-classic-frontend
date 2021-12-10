import React, { FC, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { chakra, Text, useToast } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { TxStep, fromTerraAmount, num } from "@arthuryeti/terra";
import { StdFee } from "@terra-money/terra.js";

import { DEFAULT_SLIPPAGE } from "constants/constants";
import { useSwap, usePriceImpact } from "modules/swap";
import { useTokenInfo } from "modules/common";
import { toAmount } from "libs/parse";
import useDebounceValue from "hooks/useDebounceValue";

import FormSummary from "components/common/FormSummary";
import FormConfirm from "components/common/FormConfirm";
import SwapFormInitial from "components/swap/SwapFormInitial";
import FormLoading from "components/common/FormLoading";
import TransactionNotification from "components/notifications/Transaction";

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

  const priceImpact = usePriceImpact({ token1, token2 });

  useEffect(() => {
    router.push(`/?from=${token1.asset}&to=${token2.asset}`, undefined, {
      shallow: true,
    });
  }, [token1, token2]);

  const debouncedAmount1 = useDebounceValue(token1.amount, 200);

  const showNotification = useCallback(
    (type: "success" | "error", txHash?: string) => {
      const { token1, token2 } = getValues();

      if (!txHash || !toast.isActive(txHash)) {
        toast({
          id: txHash,
          position: "top-right",
          duration: 9000,
          render: ({ onClose }) => (
            <TransactionNotification
              onClose={onClose}
              txHash={txHash}
              type={type}
            >
              <Text textStyle="medium">
                Swap {token1.amount} {getSymbol(token1.asset)} for{" "}
                {token2.amount} {getSymbol(token2.asset)}
              </Text>
            </TransactionNotification>
          ),
        });
      }
    },
    []
  );

  const state = useSwap({
    token1: token1.asset,
    token2: token2.asset,
    amount: toAmount(debouncedAmount1),
    slippage: String(slippage),
    onSuccess: (txHash) => showNotification("success", txHash),
    onError: (txHash) => {
      showNotification("error", txHash);
      reset();
    },
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

  const estimateFees = (fee?: StdFee | null) =>
    fromTerraAmount(String(fee?.gas), "0.[000]");

  const estimateExchangeRate = (simulated: any) =>
    `1 ${getSymbol(token2.asset)} = ${num(simulated.price).toPrecision(
      3
    )} ${getSymbol(token1.asset)}`;

  if (txStep == TxStep.Broadcasting || txStep == TxStep.Posting) {
    return <FormLoading txHash={txHash} />;
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
              { label: "Price Impact", value: `${priceImpact}%` },
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
