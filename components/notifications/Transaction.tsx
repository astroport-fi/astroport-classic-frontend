import React, { FC, ReactNode } from "react";
import { Link, Text } from "@chakra-ui/react";

import useFinder from "hooks/useFinder";
import Toast from "components/notifications/Toast";

type Props = {
  onClose: () => void;
  txHash?: string;
  toastType?: string;
  children?: ReactNode;
};

const Transaction: FC<Props> = ({
  onClose,
  txHash,
  toastType = "success",
  children,
}) => {
  const finder = useFinder();

  return (
    <Toast type={toastType} onClose={onClose}>
      {children}
      {txHash && (
        <Link href={finder(txHash, "tx")} isExternal>
          <Text textStyle={["small", "medium"]} variant="dimmed">
            View Transaction
          </Text>
        </Link>
      )}
    </Toast>
  );
};

export default Transaction;
