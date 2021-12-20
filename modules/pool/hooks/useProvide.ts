import { useMemo } from "react";
import { Coin, TxInfo } from "@terra-money/terra.js";
import { useAddress, useTransaction, TxStep, num } from "@arthuryeti/terra";

import { createProvideMsgs } from "modules/pool";
import { Pool } from "types/common";

export type ProvideState = {
  error: any;
  fee: any;
  txHash?: string;
  txStep: TxStep;
  reset: () => void;
  submit: () => void;
};

type Params = {
  pool: Pool;
  contract: string;
  token1: string;
  amount1: string | null;
  token2: string;
  amount2: string | null;
  autoStake: boolean;
  onBroadcasting?: (txHash: string) => void;
  onSuccess?: (txHash: string, txInfo?: TxInfo) => void;
  onError?: (txHash?: string, txInfo?: TxInfo) => void;
};

export const useProvide = ({
  contract,
  pool,
  token1,
  token2,
  amount1,
  amount2,
  autoStake,
  onBroadcasting,
  onSuccess,
  onError,
}: Params): ProvideState => {
  const address = useAddress();

  const msgs = useMemo(() => {
    if (
      amount1 == "" ||
      amount2 == "" ||
      contract == null ||
      pool == null ||
      num(amount1).eq(0) ||
      num(amount2).eq(0)
    ) {
      return null;
    }

    return createProvideMsgs(
      {
        contract,
        pool,
        coin1: new Coin(token1, amount1),
        coin2: new Coin(token2, amount2),
        autoStake,
        slippage: "0.02",
      },
      address
    );
  }, [address, contract, pool, token1, token2, autoStake, amount1, amount2]);

  return useTransaction({
    msgs,
    onBroadcasting,
    onSuccess,
    onError,
  });
};

export default useProvide;
