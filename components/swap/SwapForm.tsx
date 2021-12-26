import React, { FC, useState, useEffect, useCallback } from "react";
import { chakra } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import {
  fromTerraAmount,
  num,
  toTerraAmount,
  useEstimateFee,
  useTx,
} from "@arthuryeti/terra";
import { useRouter } from "next/router";
import { useWallet } from "@terra-money/wallet-provider";

import { DEFAULT_SLIPPAGE } from "constants/constants";
import { useSwap, useSwapRoute } from "modules/swap";
import { useAstroswap } from "modules/common";
import useDebounceValue from "hooks/useDebounceValue";
import useLocalStorage from "hooks/useLocalStorage";

import SwapFormConfirm from "components/swap/SwapFormConfirm";
import SwapFormInitial from "components/swap/SwapFormInitial";
import SwapFormFooter from "components/swap/SwapFormFooter";
import FormLoading from "components/common/FormLoading";

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
  const router = useRouter();
  const {
    network: { name: networkName },
  } = useWallet();
  const [currentInput, setCurrentInput] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const [slippageSetting, setSlippageSetting] = useLocalStorage(
    "slippageSetting",
    DEFAULT_SLIPPAGE
  );
  const [expertMode, setExpertMode] = useLocalStorage("expertMode", false);
  const isReverse = currentInput == "amount2";

  const [showConfirm, setShowConfirm] = useState(false);

  const methods = useForm<FormValues>({
    defaultValues: {
      token1: defaultToken1,
      amount1: "",
      token2: defaultToken2,
      amount2: "",
      slippage: slippageSetting,
    },
  });

  const { watch, setValue } = methods;

  const { slippage, token1, amount1, token2, amount2 } = watch();

  const debouncedAmount1 = useDebounceValue(amount1, 500);
  const debouncedAmount2 = useDebounceValue(amount2, 500);

  const swapRoute = useSwapRoute({
    routes,
    from: token1,
    to: token2,
  });

  const handleSuccess = useCallback(
    (result) => {
      const inputToUpdate = isReverse ? "amount1" : "amount2";

      setValue(inputToUpdate, fromTerraAmount(result?.amount, "0.000[000]"));
    },
    [isReverse]
  );

  useEffect(() => {
    methods.reset();
  }, [networkName]);

  useEffect(() => {
    if (slippage != slippageSetting) {
      setSlippageSetting(slippage);
    }
  }, [slippage]);

  useEffect(() => {
    if (defaultToken2 != token2 || defaultToken1 != token1) {
      router.push(`/swap?from=${token1}&to=${token2}`, undefined, {
        shallow: true,
      });
    }
  }, [token1, token2]);

  const handleInputChange = (value) => {
    setCurrentInput(value);
  };

  const { msgs, minReceive, simulated } = useSwap({
    swapRoute,
    token1: token1,
    token2: token2,
    amount1: toTerraAmount(debouncedAmount1),
    amount2: toTerraAmount(debouncedAmount2),
    slippage: num(slippage).div(100).toString(),
    onSimulateSuccess: handleSuccess,
    reverse: isReverse,
  });

  const {
    fee,
    isLoading: feeIsLoading,
    error,
  } = useEstimateFee({
    msgs,
  });

  const { submit, txHash } = useTx({
    onPosting: () => {
      setIsPosting(true);
    },
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

  const onSubmit = useCallback(() => {
    submit({
      msgs,
      fee,
    });
  }, [msgs, fee]);

  const resetForm = useCallback(() => {
    methods.reset();
    setShowConfirm(false);
    setIsPosting(false);
  }, [methods]);

  if (isPosting) {
    return <FormLoading txHash={txHash} />;
  }

  return (
    <FormProvider {...methods}>
      <chakra.form onSubmit={methods.handleSubmit(onSubmit)} width="full">
        {!showConfirm && (
          <>
            <SwapFormInitial
              token1={token1}
              token2={token2}
              error={error}
              expertMode={expertMode}
              onInputChange={handleInputChange}
              onExpertModeChange={setExpertMode}
              isDisabled={fee == null}
              isSecondInputDisabled={
                swapRoute?.length > 1 || simulated.isLoading
              }
              isLoading={simulated.isLoading}
            />
            <SwapFormFooter
              from={token1}
              amount1={amount1}
              to={token2}
              amount2={amount2}
              isLoading={feeIsLoading}
              isDisabled={fee == null || feeIsLoading}
              price={isReverse ? simulated?.price : simulated?.price2}
              fee={fee}
              onConfirmClick={() => {
                expertMode
                  ? methods.handleSubmit(onSubmit)()
                  : setShowConfirm(true);
              }}
            />
          </>
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
            minReceive={minReceive}
            onCloseClick={() => setShowConfirm(false)}
          />
        )}
      </chakra.form>
    </FormProvider>
  );
};

export default SwapForm;
