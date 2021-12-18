import React, { FC, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { chakra, Text, useToast } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { TxStep, fromTerraAmount, num, toTerraAmount } from "@arthuryeti/terra";
import { Fee } from "@terra-money/terra.js";
import { useWallet } from "@terra-money/wallet-provider";

import { DEFAULT_SLIPPAGE } from "constants/constants";
import {
  useSwap,
  usePriceImpact,
  useSwapRoute,
  useSwapSimulate,
} from "modules/swap";
import { useTokenInfo, useAstroswap } from "modules/common";
import useDebounceValue from "hooks/useDebounceValue";
import useLocalStorage from "hooks/useLocalStorage";

import FormSummary from "components/common/FormSummary";
import FormConfirm from "components/common/FormConfirm";
import SwapFormInitial from "components/swap/SwapFormInitial";
import FormLoading from "components/common/FormLoading";
import TransactionNotification from "components/notifications/Transaction";

type FormValues = {
  token1: string;
  amount1: string;
  token2: string;
  amount2: string;
};

const SwapForm: FC = () => {
  const toast = useToast();
  const { routes } = useAstroswap();
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
      // token1: getTokenFromUrlParam(router.query.from?.toString(), "uluna"),
      token1: "uusd",
      amount1: "",
      //: getTokenFromUrlParam(router.query.to?.toString(), "uusd"),
      token2: "uluna",
      amount2: "",
    },
  });

  const { getValues, watch } = methods;

  const token1 = watch("token1");
  const amount1 = watch("amount1");
  const token2 = watch("token2");
  const amount2 = watch("amount2");

  const debouncedAmount1 = useDebounceValue(amount1, 200);
  const debouncedAmount2 = useDebounceValue(amount2, 200);

  const swapRoute = useSwapRoute({
    routes,
    from: token1,
    to: token2,
  });

  const handleSuccess = useCallback(
    (result) => {
      methods.setValue(
        "amount2",
        fromTerraAmount(result?.amount, "0.000[000]")
      );
    },
    [methods]
  );

  const simulated = useSwapSimulate({
    swapRoute,
    amount: toTerraAmount(debouncedAmount1),
    token: token1,
    reverse: false,
    onSuccess: handleSuccess,
  });

  const priceImpact = usePriceImpact({
    from: token1,
    to: token2,
    price: simulated?.price,
  });

  // useEffect(() => {
  //   router.push(`/?from=${token1}&to=${token2}`, undefined, {
  //     shallow: true,
  //   });
  // }, [token1, token2, router]);

  useEffect(() => {
    methods.reset();
  }, [networkName]);

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
                Swap {amount1} {getSymbol(token1)} for {amount2}{" "}
                {getSymbol(token2)}
              </Text>
            </TransactionNotification>
          ),
        });
      }
    },
    []
  );

  const state = useSwap({
    swapRoute,
    simulated,
    token1: token1,
    token2: token2,
    amount1: toTerraAmount(debouncedAmount1),
    amount2: toTerraAmount(debouncedAmount2),
    slippage: "0.5",
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

  const submit = async () => {
    swap();
  };

  const estimateFees = (fee?: Fee | null) => {
    return fromTerraAmount(1000000, "0.[000]");
    // return fromTerraAmount(String(fee?.gas), "0.[000]");
  };

  const estimateExchangeRate = (simulated: any) =>
    `1 ${getSymbol(token2)} = ${num(simulated.price).toPrecision(
      3
    )} ${getSymbol(token1)}`;

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
            price={simulated?.price}
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
                token1={{ asset: token1, amount: amount1 }}
                token2={{ asset: token2, amount: amount2 }}
              />
            }
            details={[
              { label: "Price Impact", value: `${priceImpact * 100}%` },
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
                value: `${getSymbol(token1)}→${getSymbol(token2)}`,
              },
              {
                label: "Exchange Rate",
                value: estimateExchangeRate(simulated),
              },
              {
                label: "Minimum received",
                value: amount2,
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
