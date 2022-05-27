import { useMemo } from "react";

import { createUnlockMsgs } from "modules/lockdrop";
import {
  useContracts,
  useTransaction,
  TxStep,
  TxErrorHandler,
} from "modules/common";
import useAddress from "hooks/useAddress";

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
  astroLpToken: string;
  amount: number;
  onBroadcasting?: (txHash: string) => void;
  onError?: TxErrorHandler;
};

export const useUnlock = ({
  token,
  astroLpToken,
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
      address || ""
    );
  }, [address, lockdrop, token, duration]);

  return useTransaction({
    notification: {
      type: "lockdropUnlockLp",
      data: {
        token: astroLpToken,
      },
    },
    msgs,
    onBroadcasting,
    onError,
  });
};

export default useUnlock;
