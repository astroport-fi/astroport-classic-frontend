import { useCallback, useMemo, useState, useEffect } from "react";
import { TxResult } from "@terra-dev/wallet-types";
import { Coin, StdFee } from "@terra-money/terra.js";
import { isValidAmount, useAddress, useTransaction } from "@arthuryeti/terra";

import { createProvideMsgs } from "modules/pool";
import { Pool } from "types/common";

export enum ProvideStep {
  Initial = 1,
  Confirm = 2,
  Pending = 3,
  Success = 4,
  Error = 5,
}

type Params = {
  pool: Pool;
  contract: string;
  token1: string;
  amount1: string;
  token2: string;
  amount2: string;
};

export type ProvideState = {
  setStep: (a: ProvideStep) => void;
  step: ProvideStep;
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
  const [step, setStep] = useState<ProvideStep>(ProvideStep.Initial);
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
    setStep(ProvideStep.Initial);
  }, [reset]);

  useEffect(() => {
    if (step === ProvideStep.Confirm) {
      if (result?.success) {
        setStep(ProvideStep.Success);
      }

      if (error) {
        setStep(ProvideStep.Error);
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
