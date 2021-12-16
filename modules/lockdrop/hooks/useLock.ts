import { useMemo } from "react";
import { TxInfo } from "@terra-money/terra.js";
import { useAddress, useTransaction, TxStep, num } from "@arthuryeti/terra";

import { createLockMsgs } from "modules/lockdrop";
import { useContracts } from "modules/common";

export type LockState = {
  error: any;
  fee: any;
  txHash?: string;
  txStep: TxStep;
  txInfo: TxInfo;
  reset: () => void;
  submit: () => void;
};

type Params = {
  amount: string;
  asset: string;
  duration: number;
  onSuccess?: (txHash: string) => void;
  onError?: (txHash?: string) => void;
};

export const useLock = ({
  asset,
  amount,
  duration,
  onSuccess,
  onError,
}: Params): LockState => {
  const address = useAddress();
  const { lockdrop } = useContracts();

  const msgs = useMemo(() => {
    if (amount == "" || num(amount).isEqualTo("0") || duration == null) {
      return null;
    }

    return createLockMsgs(
      {
        contract: lockdrop,
        asset,
        amount,
        duration,
      },
      address
    );
  }, [address, lockdrop, asset, amount, duration]);

  return useTransaction({
    msgs,
    onSuccess,
    onError,
  });
};

export default useLock;
