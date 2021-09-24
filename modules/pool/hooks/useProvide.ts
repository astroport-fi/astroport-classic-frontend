import { useCallback, useMemo, useState, useEffect } from "react";
import { TxResult } from "@terra-dev/wallet-types";
import { Coin, StdFee } from "@terra-money/terra.js";
import { isValidAmount, useAddress, useTransaction } from "@arthuryeti/terra";

import { createProvideMsgs } from "modules/pool";
import { Pool, FormStep } from "types/common";

type Params = {
  pool: Pool;
  contract: string;
  token1: string;
  amount1: string;
  token2: string;
  amount2: string;
};

export type ProvideState = {
  setStep: (a: FormStep) => void;
  step: FormStep;
  resetForm: () => void;
  fee: StdFee | null;
  result: TxResult;
  error: string | null;
  isReady: boolean;
  provideLiquidity: () => void;
};

export const useProvide = ({
  contract,
  pool,
  token1,
  token2,
  amount1,
  amount2,
}: Params): ProvideState => {
  const [step, setStep] = useState<FormStep>(FormStep.Initial);
  const address = useAddress();

  const msgs = useMemo(() => {
    if (!isValidAmount(amount1) || !isValidAmount(amount2) || pool == null) {
      return [];
    }

    return createProvideMsgs(
      {
        contract,
        pool,
        coin1: new Coin(token1, amount1),
        coin2: new Coin(token2, amount2),
      },
      address
    );
  }, [address, contract, pool, token1, token2, amount1, amount2]);

  const { fee, submit, result, error, isReady, reset } = useTransaction({
    msgs,
  });

  const resetForm = useCallback(() => {
    reset();
    setStep(FormStep.Initial);
  }, [reset]);

  useEffect(() => {
    if (step === FormStep.Confirm) {
      if (result?.success) {
        setStep(FormStep.Success);
      }

      if (error) {
        setStep(FormStep.Error);
      }
    }
  }, [result, error, step]);

  return {
    setStep,
    step,
    resetForm,
    fee,
    result,
    error,
    isReady,
    provideLiquidity: submit,
  };
};

export default useProvide;
