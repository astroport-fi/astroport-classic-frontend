import { useMemo } from "react";
import { useAddress, useTransaction, TxStep, num } from "@arthuryeti/terra";

import { createUnlockMsgs } from "modules/lockdrop";
import { useContracts } from "modules/common";
import { TxInfo } from "@terra-money/terra.js";

export type UnlockState = {
  error: any;
  fee: any;
  txHash?: string;
  txStep: TxStep;
  reset: () => void;
  submit: () => void;
};

type Params = {
  duration: number;
  token: string;
  amount: number;
  onBroadcasting?: (txHash: string) => void;
  onSuccess?: (txHash: string, txInfo?: TxInfo) => void;
  onError?: (txHash?: string, txInfo?: TxInfo) => void;
};

export const useUnlock = ({
  token,
  duration,
  onBroadcasting,
  onSuccess,
  onError,
}: Params): UnlockState => {
  const address = useAddress();
  const { lockdrop } = useContracts();

  const msgs = useMemo(() => {
    if (token == null || duration == null) {
      return null;
    }

    return createUnlockMsgs(
      {
        contract: lockdrop,
        token,
        duration,
      },
      address
    );
  }, [address, lockdrop, token, duration]);

  return useTransaction({
    msgs,
    onBroadcasting,
    onSuccess,
    onError,
  });
};

export default useUnlock;
