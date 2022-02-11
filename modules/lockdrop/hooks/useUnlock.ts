import { useMemo } from "react";
import { useAddress, num } from "@arthuryeti/terra";

import { createUnlockMsgs } from "modules/lockdrop";
import {
  useContracts,
  useTransaction,
  TxStep,
  TxErrorHandler,
} from "modules/common";

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
  onError?: TxErrorHandler;
};

export const useUnlock = ({
  token,
  duration,
  onBroadcasting,
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
    onError,
  });
};

export default useUnlock;
