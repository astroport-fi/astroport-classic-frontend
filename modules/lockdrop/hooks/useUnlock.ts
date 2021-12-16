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
  token: {
    asset: string;
    amount: string;
  };
  onSuccess?: (txHash: string) => void;
  onError?: (txHash?: string) => void;
};

export const useUnlock = ({
  token,
  duration,
  onSuccess,
  onError,
}: Params): UnlockState => {
  const address = useAddress();
  const { lockdrop } = useContracts();

  const msgs = useMemo(() => {
    if (
      token.amount == "" ||
      num(token.amount).isEqualTo("0") ||
      duration == null
    ) {
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

  const { submit, ...rest } = useTransaction({
    msgs,
    onSuccess,
    onError,
  });

  return {
    ...rest,
    submit,
  };
};

export default useUnlock;
