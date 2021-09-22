import { useMemo, useState } from "react";
import { Coin } from "@terra-money/terra.js";
import {
  isValidAmount,
  useAddress,
  useTerra,
  useTransaction,
} from "@arthuryeti/terra";

import { createProvideMsgs, calculateProvideOneAsset } from "modules/pool";
import { findSwapRoute, useSimulation, createSwapMsgs } from "modules/swap";
import { Pool } from "types/common";
import networks from "constants/networks";

type Params = {
  contract: string;
  pool: Pool;
  token1: string;
  token2: string;
  amount: string;
};

export enum ProvideSingleStep {
  Initial = 1,
  Confirm = 2,
  Pending = 3,
  Success = 4,
  Error = 5,
}

export const useProvideSingle = ({
  contract,
  pool,
  token1,
  token2,
  amount,
}: Params) => {
  const [step, setStep] = useState<ProvideSingleStep>(
    ProvideSingleStep.Initial
  );
  const address = useAddress();
  const {
    networkInfo: { name },
    routes,
  } = useTerra();
  const { router } = networks[name];

  const swapRoute = useMemo(
    () => findSwapRoute(routes, token1, token2),
    [routes, token1, token2]
  );

  const swapAmount = useMemo(
    () => String(Math.floor(Number(amount) / 2)),
    [amount]
  );

  const { amount: amount2 } = useSimulation(token1, token2, swapAmount);

  const swapMsgs = useMemo(() => {
    if (!isValidAmount(swapAmount) || !swapRoute) {
      return [];
    }

    return createSwapMsgs(
      {
        token1,
        route: swapRoute,
        amount: swapAmount,
        router,
      },
      address
    );
  }, [router, swapAmount, swapRoute, address, token1]);

  const provideAmounts = useMemo(() => {
    return calculateProvideOneAsset(pool, token1, swapAmount, amount2);
  }, [pool, token1, swapAmount, amount2]);

  const provideMsgs = useMemo(() => {
    const { provideAmount1, provideAmount2 } = provideAmounts;

    if (!(isValidAmount(provideAmount1) && isValidAmount(provideAmount2))) {
      return [];
    }

    return createProvideMsgs(
      {
        contract,
        pool,
        coin1: new Coin(token1, provideAmount1),
        coin2: new Coin(token2, provideAmount2),
      },
      address
    );
  }, [provideAmounts, contract, address, pool, token1, token2]);

  const msgs = useMemo(() => {
    return [...swapMsgs, ...provideMsgs];
  }, [swapMsgs, provideMsgs]);

  const { fee, submit, result, error, isReady } = useTransaction({
    msgs,
  });

  return {
    setStep,
    step,
    fee,
    isReady,
    result,
    error,
    provideLiquidity: submit,
  };
};

export default useProvideSingle;
