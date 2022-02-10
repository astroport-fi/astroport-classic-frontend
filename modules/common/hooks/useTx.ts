import { useCallback } from "react";
import { Fee, MsgExecuteContract } from "@terra-money/terra.js";
import { useWallet } from "@terra-money/wallet-provider";
import {
  UserDenied,
  CreateTxFailed,
  TxFailed,
  Timeout,
  TxUnspecifiedError,
} from "@terra-money/wallet-types";

export enum PostError {
  UserDenied,
  CreateTxFailed,
  TxFailed,
  Timeout,
  TxUnspecifiedError,
  UnknownError,
}

type Params = {
  onPosting?: () => void;
  onBroadcasting?: (txHash: string) => void;

  // originalErrors: https://github.com/terra-money/wallet-provider/blob/v3.7.1/packages/src/%40terra-dev/wallet-types/errors.ts
  onError?: (errorType: PostError, originalError: Error) => void;
};

const enumForPostError = (error: Error) => {
  if (error instanceof UserDenied) {
    return PostError.UserDenied;
  } else if (error instanceof CreateTxFailed) {
    return PostError.CreateTxFailed;
  } else if (error instanceof TxFailed) {
    return PostError.TxFailed;
  } else if (error instanceof Timeout) {
    return PostError.Timeout;
  } else if (error instanceof TxUnspecifiedError) {
    return PostError.TxUnspecifiedError;
  } else {
    return PostError.UnknownError;
  }
};

export const useTx = ({ onPosting, onBroadcasting, onError }: Params) => {
  const { post } = useWallet();

  const submit = useCallback(
    async ({ msgs, fee }: { msgs: MsgExecuteContract[]; fee: Fee }) => {
      if (fee == null || msgs == null || msgs.length < 1) {
        return;
      }

      onPosting?.();

      try {
        const res = await post({
          msgs,
          fee,
        });

        onBroadcasting?.(res.result.txhash);
      } catch (e) {
        onError?.(enumForPostError(e), e);
      }
    },
    [onPosting, onBroadcasting, onError]
  );

  return {
    submit,
  };
};

export default useTx;
