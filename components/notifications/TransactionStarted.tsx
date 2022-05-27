import { FC, useCallback } from "react";
import { useAstroswap } from "modules/common";
import useTxInfo from "hooks/useTxInfo";

type Props = {
  onClose: () => void;
  txHash: string;
  txType: string;
  data?: any;
};

const TransactionStarted: FC<Props> = ({ onClose, txHash, txType, data }) => {
  const { addNotification } = useAstroswap();
  const handleSuccess = useCallback(
    (_, txInfo) => {
      addNotification({
        notification: {
          type: "succeed",
          txHash,
          txInfo,
          txType,
          data,
        },
      });

      onClose();
    },
    [txHash]
  );

  const handleError = useCallback(
    (_, txInfo) => {
      addNotification({
        notification: {
          type: "failed",
          txInfo,
          txHash,
          txType,
        },
      });

      onClose();
    },
    [txHash]
  );

  useTxInfo({ txHash, onSuccess: handleSuccess, onError: handleError });

  return null;
};

export default TransactionStarted;
