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

export enum TxPostError {
  UserDenied,
  CreateTxFailed,
  TxFailed,
  Timeout,
  TxUnspecifiedError,
  UnknownError,
}

export type TxErrorHandler = (
  errorType: TxPostError,
  originalError: Error
) => void;

type Params = {
  onPosting?: () => void;
  onBroadcasting?: (txHash: string) => void;

  // originalErrors: https://github.com/terra-money/wallet-provider/blob/v3.7.1/packages/src/%40terra-dev/wallet-types/errors.ts
  onError?: TxErrorHandler;
};

const enumForTxPostError = (error: Error) => {
  if (error instanceof UserDenied) {
    return TxPostError.UserDenied;
  } else if (error instanceof CreateTxFailed) {
    return TxPostError.CreateTxFailed;
  } else if (error instanceof TxFailed) {
    return TxPostError.TxFailed;
  } else if (error instanceof Timeout) {
    return TxPostError.Timeout;
  } else if (error instanceof TxUnspecifiedError) {
    return TxPostError.TxUnspecifiedError;
  } else {
    return TxPostError.UnknownError;
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
        onError?.(enumForTxPostError(e), e);
      }
    },
    [onPosting, onBroadcasting, onError]
  );

  return {
    submit,
  };
};
