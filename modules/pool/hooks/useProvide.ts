import { useMemo } from "react";
import { Coin } from "@terra-money/terra.js";
import { useAddress, useTransaction, TxStep } from "@arthuryeti/terra";

import { createProvideMsgs } from "modules/pool";
import { Pool } from "types/common";

export type ProvideState = {
  error: any;
  fee: any;
  txHash?: string;
  txStep: TxStep;
  reset: () => void;
  provideLiquidity: () => void;
};

type Params = {
  pool: Pool;
  contract: string;
  token1: string;
  amount1: string | null;
  token2: string;
  amount2: string | null;
  onSuccess?: (txHash: string) => void;
  onError?: (txHash?: string) => void;
};

export const useProvide = ({
  contract,
  pool,
  token1,
  token2,
  amount1,
  amount2,
  onSuccess,
  onError,
}: Params): ProvideState => {
  const address = useAddress();

  const msgs = useMemo(() => {
    if (amount1 == null || amount2 == null || pool == null) {
      return [];
    }

    return createProvideMsgs(
      {
        contract,
        pool,
        coin1: new Coin(token1, amount1),
        coin2: new Coin(token2, amount2),
        slippage: "0.02",
      },
      address
    );
  }, [address, contract, pool, token1, token2, amount1, amount2]);

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

export default useProvide;
