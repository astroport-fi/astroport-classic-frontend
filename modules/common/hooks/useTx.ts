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
import { useAstroswap, useTokenInfo } from "modules/common";

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

export type UseTxNotificationDetails =
  | {
      type: "swap" | "provide" | "withdraw";
      data: {
        token1: string;
        token2: string;
      };
    }
  | {
      type: "unstakeLp" | "lockdropUnlockLp";
      data: {
        token: string;
      };
    }
  | {
      type:
        | "govStake"
        | "govUnstake"
        | "claimRewards"
        | "auctionUnlockLp"
        | "stakeLp"
        | "claimRewards";
    };

type Params = {
  onPosting?: () => void;
  onBroadcasting?: (txHash: string) => void;

  // originalErrors: https://github.com/terra-money/wallet-provider/blob/v3.7.1/packages/src/%40terra-dev/wallet-types/errors.ts
  onError?: TxErrorHandler;

  notification: UseTxNotificationDetails;
};

const enumForTxPostError = (error: Error) => {
  if (error instanceof UserDenied) {
    return TxPostError.UserDenied;
  } else if (error instanceof CreateTxFailed) {
    if (/^timeout of \d+ms exceeded$/.test(error.message)) {
      // Treat CreateTxFailed for timeouts as Timeout errors
      return TxPostError.Timeout;
    } else {
      return TxPostError.CreateTxFailed;
    }
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

export const useTx = ({
  onPosting,
  onBroadcasting,
  onError,
  notification,
}: Params) => {
  const { post } = useWallet();
  const { addNotification } = useAstroswap();
  const { getSymbol } = useTokenInfo();

  const errorNotificationTitle = (
    notification: UseTxNotificationDetails
  ): string => {
    switch (notification.type) {
      case "swap": {
        const { token1, token2 } = notification.data;

        return `Swap from ${getSymbol(token1)} to ${getSymbol(token2)} failed`;
      }
      case "claimRewards":
        return "Failed to claim rewards";
      case "auctionUnlockLp":
        return "Failed to unlock LP token";
      case "stakeLp":
        return "Stake LP tokens failed";
      case "unstakeLp":
        return "Unstake LP tokens failed";
      case "provide": {
        const { token1, token2 } = notification.data;

        return `Provide liquidity for ${getSymbol(token1)} and ${getSymbol(
          token2
        )} failed`;
      }
      case "withdraw": {
        const { token1, token2 } = notification.data;

        return `Withdraw liquidity for ${getSymbol(token1)} and ${getSymbol(
          token2
        )} failed`;
      }
      case "claimRewards":
        return "Failed to claim rewards";
    }

    return "Failed";
  };

  const errorNotificationDescription = (
    errorEnum: TxPostError,
    originalError: Error
  ) => {
    switch (errorEnum) {
      case TxPostError.Timeout:
        return "Timed out. Please try again.";
      case TxPostError.CreateTxFailed:
        return originalError.message;
    }
  };

  const addErrorNotification = (
    errorEnum: TxPostError,
    originalError: Error
  ) => {
    // Ignore UserDenied errors
    if (errorEnum !== TxPostError.UserDenied) {
      addNotification({
        notification: {
          type: "error",
          title: errorNotificationTitle(notification),
          description: errorNotificationDescription(errorEnum, originalError),
        },
      });
    }
  };

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

        addNotification({
          notification: {
            type: "started",
            txHash: res.result.txhash,
            txType: notification.type,

            // @ts-ignore
            data: notification.data,
          },
        });
      } catch (e) {
        const errorEnum = enumForTxPostError(e);

        addErrorNotification(errorEnum, e);

        onError?.(errorEnum, e);
      }
    },
    [onPosting, onBroadcasting, onError]
  );

  return {
    submit,
  };
};
