import React, { FC, useState, useEffect, useCallback, useMemo } from "react";
import { chakra } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { num, useBalance, useEstimateFee } from "@arthuryeti/terra";
import { useRouter } from "next/router";
import { useWallet } from "@terra-money/wallet-provider";
import numeral from "numeral";

import { DEFAULT_SLIPPAGE, ONE_TOKEN } from "constants/constants";
import { useSwap, useSwapRoute } from "modules/swap";
import {
  useAstroswap,
  useTokenInfo,
  useNotEnoughUSTBalanceToPayFees,
  useTx,
} from "modules/common";

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
  const { tokenGraph } = useAstroswap();
  const { getDecimals } = useTokenInfo();
  const router = useRouter();
  const {
    network: { name: networkName },
  } = useWallet();
  const [currentInput, setCurrentInput] = useState(null);
  const [customError, setCustomError] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const [txHash, setTxHash] = useState<string>();
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
      slippage: slippageSetting || DEFAULT_SLIPPAGE,
    },
    mode: "all",
    reValidateMode: "onChange",
  });

  const { watch, setValue } = methods;

  const { slippage, token1, amount1, token2, amount2 } = watch();

  const debouncedAmount1 = useDebounceValue(amount1, 500);
  const debouncedAmount2 = useDebounceValue(amount2, 500);
  const token1Balance = useBalance(token1);

  const swapRoute = useSwapRoute({
    tokenGraph,
    from: token1,
    to: token2,
  });

  const handleSuccess = useCallback(
    (result) => {
      const inputToUpdate = isReverse ? "amount1" : "amount2";
      const tokenToUpdate = isReverse ? token1 : token2;

      const divideBy = num(10).pow(getDecimals(tokenToUpdate));
      const newAmount = num(result.amount).div(divideBy).dp(6).toString();

      setValue(inputToUpdate, newAmount);
    },
    [isReverse, token1, token2]
  );

  const handleError = useCallback(() => {
    setCustomError("Invalid amount of tokens to receive.");
  }, []);

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

  useEffect(() => {
    if (customError) {
      setCustomError(null);
    }
  }, [token1, token2, amount1, amount2]);

  const handleInputChange = (value) => {
    setCurrentInput(value);
  };

  const { msgs, minReceive, simulated } = useSwap({
    swapRoute,
    token1: token1,
    token2: token2,
    amount1: debouncedAmount1,
    amount2: debouncedAmount2,
    slippage: num(slippage).div(100).toString(),
    onSimulateSuccess: handleSuccess,
    onSimulateError: handleError,
    reverse: isReverse,
  });

  const {
    fee,
    isLoading: feeIsLoading,
    // error,
  } = useEstimateFee({
    msgs,
  });

  const notEnoughUSTToPayFees = useNotEnoughUSTBalanceToPayFees(fee);

  const { submit } = useTx({
    notification: {
      type: "swap",
      data: {
        token1,
        token2,
      },
    },
    onPosting: () => {
      setSlippageSetting(slippage);
      setShowConfirm(false);
      setTxHash(undefined);
      setIsPosting(true);
    },
    onBroadcasting: (txHash) => {
      setTxHash(txHash);
      setIsPosting(false);
      resetWithSameTokens();
    },
    onError: () => {
      setShowConfirm(false);
      setIsPosting(false);
    },
  });

  const onSubmit = useCallback(() => {
    submit({
      msgs,
      fee,
    });
  }, [msgs, fee]);

  const resetWithSameTokens = useCallback(() => {
    methods.reset({
      token1,
      token2,
      amount1: "",
      amount2: "",
    });
  }, [token1, token2]);

  // const resetWithSameTokensAndAmount = useCallback(() => {
  //   methods.reset(null, {
  //     keepValues: true,
  //   });
  //   resetState();
  // }, []);

  const resetState = useCallback(() => {
    setShowConfirm(false);
    setIsPosting(false);
  }, []);

  const isFormValid = useMemo(() => {
    if (
      amount1 == "" ||
      amount2 == "" ||
      num(amount1).eq(0) ||
      num(amount2).eq(0) ||
      customError
    ) {
      return false;
    }

    return true;
  }, [token1, amount1, token2, amount2, customError]);

  const error = useMemo(() => {
    if (customError) {
      return customError;
    }

    if (amount1 == "" || amount2 == "") {
      return false;
    }

    if (num(amount1).eq(0) || num(amount2).eq(0)) {
      return "Both amounts must be greater than 0";
    }

    if (notEnoughUSTToPayFees) {
      return "Insufficient UST to pay for the transaction.";
    }

    if (num(amount1).gt(0) && num(token1Balance).div(ONE_TOKEN).lt(amount1)) {
      return "insufficient assets in wallet";
    }

    return false;
  }, [
    token1,
    amount1,
    token2,
    amount2,
    simulated,
    customError,
    notEnoughUSTToPayFees,
  ]);

  const formattedPrice = useMemo(() => {
    return numeral(simulated?.price).format("0,0.00[000]").toString();
  }, [simulated?.price]);

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
              isFormValid={isFormValid}
              isReverse={isReverse}
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
              price={simulated?.price}
              formattedPrice={formattedPrice}
              swapRoute={swapRoute}
              fee={fee}
              error={error}
              isFormValid={isFormValid}
              txFeeNotEnough={notEnoughUSTToPayFees}
              onConfirmClick={() => {
                expertMode ? onSubmit() : setShowConfirm(true);
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
            price={simulated?.price}
            formattedPrice={formattedPrice}
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
