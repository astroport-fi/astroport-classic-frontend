import React, { FC } from "react";
import { Text, VStack } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";

import { useAstroswap } from "modules/common";

import TransactionNotification from "components/notifications/Transaction";
import SwapNotification from "components/notifications/SwapNotification";
import ProvideNotification from "components/notifications/ProvideNotification";
import WithdrawNotification from "components/notifications/WithdrawNotification";

const Notifications: FC = () => {
  const { notifications, removeNotification } = useAstroswap();

  return (
    <VStack position="absolute" top="0" right="2rem">
      <AnimatePresence initial={false}>
        {notifications.items?.map(({ id, txHash, txInfo, txType, type }) => {
          return (
            <TransactionNotification
              key={id}
              txHash={txHash}
              type={type}
              onClose={() => {
                removeNotification({ notificationId: id });
              }}
            >
              {txType == "swap" && <SwapNotification txInfo={txInfo} />}
              {txType == "provide" && <ProvideNotification txInfo={txInfo} />}
              {txType == "withdraw" && <WithdrawNotification txInfo={txInfo} />}
            </TransactionNotification>
          );
        })}
      </AnimatePresence>
    </VStack>
  );
};

export default Notifications;
