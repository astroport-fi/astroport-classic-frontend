import { useMemo } from "react";
import {
  useAddress,
  num,
  useTransaction,
  TxStep,
  toTerraAmount,
} from "@arthuryeti/terra";

import { useContracts } from "modules/common";
import { createUnstakeLpMsgs } from "modules/lp";
import { TxInfo } from "@terra-money/terra.js";

export type UnstakeLpTokenState = {
  error: any;
  fee: any;
  txHash?: string;
  txStep: TxStep;
  reset: () => void;
  submit: () => void;
};

type Params = {
  amount: string | null;
  token: string | null;
  onBroadcasting?: (txHash: string) => void;
  onSuccess?: (txHash: string, txInfo?: TxInfo) => void;
  onError?: (txHash?: string, txInfo?: TxInfo) => void;
};

export const useUnstakeLpToken = ({
  amount,
  token,
  onBroadcasting,
  onSuccess,
  onError,
}: Params): UnstakeLpTokenState => {
  const { generator } = useContracts();
  const address = useAddress();

  const msgs = useMemo(() => {
    if (amount == "" || num(amount).eq(0) || address == null || token == null) {
      return null;
    }

    return createUnstakeLpMsgs(
      { amount: toTerraAmount(amount), token, contract: generator },
      address
    );
  }, [address, amount, generator, token]);

  return useTransaction({
    msgs,
    onBroadcasting,
    onSuccess,
    onError,
  });
};
