import { FC, useCallback } from "react";

import { useTxInfo } from "@arthuryeti/terra";
import { useAstroswap } from "modules/common";

type Props = {
  onClose: () => void;
  txHash: string;
  txType: string;
};

const TransactionStarted: FC<Props> = ({ onClose, txHash, txType }) => {
  const { addNotification } = useAstroswap();
  const handleSuccess = useCallback(
    (_, txInfo) => {
      addNotification({
        notification: {
          type: "succeed",
          txHash,
          txInfo,
          txType,
        },
      });

      onClose();
    },
    [txHash]
  );

  const handleError = useCallback(() => {
    addNotification({
      notification: {
        type: "failed",
        txHash,
        txType,
      },
    });

    onClose();
  }, [txHash]);

  useTxInfo({ txHash, onSuccess: handleSuccess, onError: handleError });

  return null;
};

export default TransactionStarted;
