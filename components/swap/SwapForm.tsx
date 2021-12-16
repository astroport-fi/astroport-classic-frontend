import React, { FC, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { chakra, Text, useToast } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { TxStep, fromTerraAmount, num, toTerraAmount } from "@arthuryeti/terra";
import { Fee } from "@terra-money/terra.js";
import { useWallet } from "@terra-money/wallet-provider";

import { DEFAULT_SLIPPAGE } from "constants/constants";
import { useSwap, usePriceImpact } from "modules/swap";
import { useTokenInfo, useAstroswap } from "modules/common";
import useDebounceValue from "hooks/useDebounceValue";
import useLocalStorage from "hooks/useLocalStorage";

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
  const {
    network: { name: networkName },
  } = useWallet();
  const { getSymbol } = useTokenInfo();
  const { tokens: terraTokens } = useAstroswap();
  const router = useRouter();
  const [currentInput, setCurrentInput] = useState(null);
  const [slippage, setSlippage] = useLocalStorage("slippage", DEFAULT_SLIPPAGE);
  const [expertMode, setExpertMode] = useLocalStorage("expertMode", false);

  const [showConfirm, setShowConfirm] = useState(false);

  const getTokenFromUrlParam = (
    param: string | undefined,
    defaultValue: string
  ) => {
    const token = param && terraTokens?.[param]?.token;
    return token ?? defaultValue;
  };

  const methods = useForm<FormValues>({
    defaultValues: {
      token1: {
        asset: getTokenFromUrlParam(router.query.from?.toString(), "uluna"),
        amount: undefined,
      },
      token2: {
        asset: getTokenFromUrlParam(router.query.to?.toString(), "uusd"),
        amount: undefined,
      },
    },
  });

  const { getValues, watch } = methods;

  const token1 = watch("token1");
  const token2 = watch("token2");

  const priceImpact = usePriceImpact({ token1, token2 });

  // useEffect(() => {
  //   router.push(`/?from=${token1.asset}&to=${token2.asset}`, undefined, {
  //     shallow: true,
  //   });
  // }, [token1, token2, router]);

  useEffect(() => {
    methods.reset();
  }, [networkName]);

  const debouncedAmount1 = useDebounceValue(token1.amount, 200);
  const debouncedAmount2 = useDebounceValue(token2.amount, 200);

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
    amount1: toTerraAmount(debouncedAmount1),
    amount2: toTerraAmount(debouncedAmount2),
    slippage: slippage.toString(),
    reverse: currentInput == "token2",
    onSuccess: (txHash) => {
      showNotification("success", txHash);
      resetForm();
    },
    onError: (txHash) => {
      showNotification("error", txHash);
      reset();
    },
  });

  const { fee, txHash, txStep, reset, swap } = state;

  const resetForm = () => {
    reset();
    methods.reset();
  };

  useEffect(() => {
    if (txStep == TxStep.Broadcasting) {
      setShowConfirm(false);
    }
  }, [txStep]);

  useEffect(() => {
    if (num(state.simulated?.amount).gt(0)) {
      const name = currentInput == "token2" ? "token1.amount" : "token2.amount";

      methods.setValue(
        name,
        fromTerraAmount(state.simulated?.amount, "0.000000")
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.simulated]);

  const submit = async () => {
    swap();
  };

  const estimateFees = (fee?: Fee | null) => {
    return fromTerraAmount(1000000, "0.[000]");
    // return fromTerraAmount(String(fee?.gas), "0.[000]");
  };

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
            onClick={() => {
              expertMode
                ? methods.handleSubmit(submit)()
                : setShowConfirm(true);
            }}
          />
        )}

        {showConfirm && (
          <FormConfirm
            fee={fee}
            actionLabel="Confirm swap"
            contentComponent={
              <FormSummary
                label1="You are swapping from:"
                label2="↓You are swapping to:"
                token1={token1}
                token2={token2}
              />
            }
            details={[
              // { label: "Price Impact", value: `${priceImpact}%` },
              {
                label: "Liquidity Provider fee",
                value: `${estimateFees(state.fee)} UST`,
              },
              {
                label: "Slippage Tolerance",
                value: `${slippage.toPrecision(1)}%`,
              },
              {
                label: "Route",
                value: `${getSymbol(token1.asset)}→${getSymbol(token2.asset)}`,
              },
              {
                label: "Exchange Rate",
                value: estimateExchangeRate(state.simulated),
              },
              {
                label: "Minimum received",
                value: token2.amount,
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
