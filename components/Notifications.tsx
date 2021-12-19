import React, { FC } from "react";
import { Text, VStack } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";

import { useAstroswap } from "modules/common";

import TransactionNotification from "components/notifications/Transaction";
import TransactionStartedNotification from "components/notifications/TransactionStarted";
import SwapNotification from "components/notifications/SwapNotification";
import ProvideNotification from "components/notifications/ProvideNotification";
import WithdrawNotification from "components/notifications/WithdrawNotification";
import StakeLpNotification from "components/notifications/StakeLpNotification";
import UnstakeLpNotification from "components/notifications/UnstakeLpNotification";

const Notifications: FC = () => {
  const { notifications, removeNotification } = useAstroswap();

  const renderContent = ({ id, txHash, txInfo, txType, type }: any) => {
    if (type === "started") {
      return;
    }
    if (txType === "swap") {
      return <SwapNotification txInfo={txInfo} />;
    }
    if (txType === "provide") {
      return <ProvideNotification txInfo={txInfo} />;
    }
    if (txType === "withdraw") {
      return <WithdrawNotification txInfo={txInfo} />;
    }
    if (txType === "stakeLp") {
      return <StakeLpNotification txInfo={txInfo} />;
    }
    if (txType === "unstakeLp") {
      return <UnstakeLpNotification txInfo={txInfo} />;
    }
  };

  return (
    <VStack position="absolute" top="0" right="2rem">
      <AnimatePresence initial={false}>
        {notifications.items?.map(({ id, txHash, txInfo, txType, type }) => {
          const Component = {
            started: TransactionStartedNotification,
            succeed: TransactionNotification,
            failed: TransactionNotification,
          }[type];

          return (
            <Component
              key={id}
              txHash={txHash}
              txType={txType}
              type={type}
              onClose={() => {
                removeNotification({ notificationId: id });
              }}
            >
              {renderContent({ txHash, txInfo, txType, type })}
            </Component>
          );
        })}
      </AnimatePresence>
    </VStack>
  );
};

export default Notifications;
