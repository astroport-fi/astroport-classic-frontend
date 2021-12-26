import { useMemo } from "react";
import { useAddress, useTransaction, TxStep, num } from "@arthuryeti/terra";

import { createUnlockMsgs } from "modules/lockdrop";
import { useContracts } from "modules/common";

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
  amount: string;
  onSuccess?: (txHash: string) => void;
  onError?: (txHash?: string) => void;
};

export const useUnlock = ({
  token,
  amount,
  duration,
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
    onSuccess,
    onError,
  });
};

export default useUnlock;
