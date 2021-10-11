import { useMemo } from "react";
import { Coin } from "@terra-money/terra.js";
import { useAddress, TxStep, useTransaction } from "@arthuryeti/terra";

import { createProvideMsgs, calculateProvideOneAsset } from "modules/pool";
import { useSwapRoute, useSwapSimulate } from "modules/swap";
import { Pool } from "types/common";
import { useAstroswap, useContracts } from "modules/common";

export type ProvideSingleState = {
  error: any;
  fee: any;
  txHash?: string;
  txStep: TxStep;
  reset: () => void;
  provideLiquidity: () => void;
};

type Params = {
  contract: string;
  pool: Pool;
  token1: string;
  token2: string;
  amount: string | null;
  onSuccess?: (txHash: string) => void;
  onError?: (txHash?: string) => void;
};

export const useProvideSingle = ({
  contract,
  pool,
  token1,
  token2,
  amount,
  onSuccess,
  onError,
}: Params) => {
  const address = useAddress();
  const { routes } = useAstroswap();
  const { router } = useContracts();

  const swapRoute = useSwapRoute({ routes, token1, token2 });

  const swapAmount = useMemo(
    () => String(Math.floor(Number(amount) / 2)),
    [amount]
  );

  //@ts-expect-error
  const { amount: amount2 } = useSwapSimulate({
    token1,
    token2,
    amount: swapAmount,
    reverse: false,
  });

  const swapMsgs = useMemo(() => {
    if (swapAmount == null || swapRoute == null) {
      return [];
    }

    return [];

    // TODO: Fix createSwapMsgs
    // return createSwapMsgs(
    //   {
    //     token1,
    //     route: swapRoute,
    //     amount: swapAmount,
    //     router,
    //   },
    //   address
    // );
  }, [router, swapAmount, swapRoute, address, token1]);

  const provideAmounts = useMemo(() => {
    return calculateProvideOneAsset(pool, token1, swapAmount, amount2);
  }, [pool, token1, swapAmount, amount2]);

  const provideMsgs = useMemo(() => {
    const { provideAmount1, provideAmount2 } = provideAmounts;

    if (provideAmount1 == null || provideAmount2 == null) {
      return [];
    }

    return createProvideMsgs(
      {
        contract,
        pool,
        coin1: new Coin(token1, provideAmount1),
        coin2: new Coin(token2, provideAmount2),
        slippage: "0.01",
      },
      address
    );
  }, [provideAmounts, contract, address, pool, token1, token2]);

  const msgs = useMemo(() => {
    return [...swapMsgs, ...provideMsgs];
  }, [swapMsgs, provideMsgs]);

  const { submit, ...rest } = useTransaction({
    msgs,
    onSuccess,
    onError,
  });

  return {
    ...rest,
    provideLiquidity: submit,
  };
};

export default useProvideSingle;
