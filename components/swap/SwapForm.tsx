import React, { FC, useState, useEffect, useCallback } from "react";
import { chakra } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { TxStep, fromTerraAmount, num, toTerraAmount } from "@arthuryeti/terra";
import { useWallet } from "@terra-money/wallet-provider";

import { DEFAULT_SLIPPAGE } from "constants/constants";
import { useSwap, useSwapRoute, useSwapSimulate } from "modules/swap";
import { useTokenInfo, useAstroswap } from "modules/common";
import useDebounceValue from "hooks/useDebounceValue";
import useLocalStorage from "hooks/useLocalStorage";

import SwapFormConfirm from "components/swap/SwapFormConfirm";
import SwapFormInitial from "components/swap/SwapFormInitial";
import FormLoading from "components/common/FormLoading";
import TransactionNotification from "components/notifications/Transaction";

type FormValues = {
  token1: string;
  amount1: string;
  token2: string;
  amount2: string;
  slippage: number;
};

type Props = {
  defaultToken1?: string;
  defaultToken2?: string;
};

const SwapForm: FC<Props> = ({ defaultToken1, defaultToken2 }) => {
  const { routes, addNotification } = useAstroswap();
  const {
    network: { name: networkName },
  } = useWallet();
  const [currentInput, setCurrentInput] = useState(null);
  const [expertMode, setExpertMode] = useLocalStorage("expertMode", false);
  const isReverse = currentInput == "amount2";

  const [showConfirm, setShowConfirm] = useState(false);

  const methods = useForm<FormValues>({
    defaultValues: {
      token1: "uusd",
      amount1: "",
      token2: "uluna",
      amount2: "",
      slippage: DEFAULT_SLIPPAGE,
    },
  });

  const { watch } = methods;

  const { slippage, token1, amount1, token2, amount2 } = watch();

  const debouncedAmount1 = useDebounceValue(amount1, 200);
  const debouncedAmount2 = useDebounceValue(amount2, 200);

  const swapRoute = useSwapRoute({
    routes,
    from: token1,
    to: token2,
  });

  const handleSuccess = useCallback(
    (result) => {
      const inputToUpdate = isReverse ? "amount1" : "amount2";

      methods.setValue(
        inputToUpdate,
        fromTerraAmount(result?.amount, "0.000[000]")
      );
    },
    [methods, isReverse]
  );

  const simulated = useSwapSimulate({
    swapRoute,
    amount: isReverse
      ? toTerraAmount(debouncedAmount2)
      : toTerraAmount(debouncedAmount1),
    token: isReverse ? token2 : token1,
    reverse: isReverse,
    onSuccess: handleSuccess,
  });

  useEffect(() => {
    methods.reset();
  }, [networkName]);

  const handleInputChange = (value) => {
    setCurrentInput(value);
  };

  const state = useSwap({
    swapRoute,
    simulated,
    token1: token1,
    token2: token2,
    amount1: toTerraAmount(debouncedAmount1),
    amount2: toTerraAmount(debouncedAmount2),
    slippage: num(slippage).div(100).toString(),
    reverse: isReverse,
    onBroadcasting: (txHash) => {
      resetForm();
      addNotification({
        notification: {
          type: "started",
          txHash,
          txType: "swap",
        },
      });
    },
    onError: () => {
      resetForm();
    },
  });

  const { fee, txHash, txStep, reset, submit } = state;

  const resetForm = useCallback(() => {
    setShowConfirm(false);
    methods.reset();
    reset();
  }, [reset, methods]);

  if (txStep == TxStep.Posting) {
    return <FormLoading txHash={txHash} />;
  }

  return (
    <FormProvider {...methods}>
      <chakra.form onSubmit={methods.handleSubmit(submit)} width="full">
        {!showConfirm && (
          <SwapFormInitial
            token1={token1}
            token2={token2}
            amount2={amount2}
            state={state}
            isReverse={isReverse}
            price={isReverse ? simulated?.price : simulated?.price2}
            expertMode={expertMode}
            onInputChange={handleInputChange}
            onExpertModeChange={setExpertMode}
            isSecondInputDisabled={swapRoute?.length > 1 || simulated.isLoading}
            onClick={() => {
              expertMode
                ? methods.handleSubmit(submit)()
                : setShowConfirm(true);
            }}
          />
        )}

        {showConfirm && (
          <SwapFormConfirm
            swapRoute={swapRoute}
            token1={token1}
            token2={token2}
            amount1={amount1}
            amount2={amount2}
            slippage={slippage}
            fee={fee}
            price={isReverse ? simulated?.price : simulated?.price2}
            commission={simulated?.commission}
            minReceive={state.minReceive}
            onCloseClick={() => setShowConfirm(false)}
          />
        )}
      </chakra.form>
    </FormProvider>
  );
};

export default SwapForm;
