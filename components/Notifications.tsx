import React, { FC } from "react";
import { VStack } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";

import {
  useAstroswap,
  TxNotificationPayload,
  GenericNotificationPayload,
} from "modules/common";

import TransactionNotification from "components/notifications/Transaction";
import TransactionStartedNotification from "components/notifications/TransactionStarted";
import FailedNotification from "components/notifications/FailedNotification";
import SwapNotification from "components/notifications/SwapNotification";
import AuctionUnlockLpNotification from "components/notifications/AuctionUnlockLpNotification";
import ProvideNotification from "components/notifications/ProvideNotification";
import WithdrawNotification from "components/notifications/WithdrawNotification";
import StakeLpNotification from "components/notifications/StakeLpNotification";
import UnstakeLpNotification from "components/notifications/UnstakeLpNotification";
import ClaimRewardsNotification from "components/notifications/ClaimRewardsNotification";
import LockdropUnlockLpNotification from "components/notifications/LockdropUnlockLpNotification";
import GovStakeNotification from "components/notifications/GovStakeNotification";
import GovUnstakeNotification from "components/notifications/GovUnstakeNotification";
import GenericNotification from "components/notifications/GenericNotification";

const Notifications: FC = () => {
  const { notifications, removeNotification } = useAstroswap();

  const renderSuccessfulTxContent = ({ txInfo, txType, data }: any) => {
    if (txType === "swap") {
      return <SwapNotification txInfo={txInfo} data={data} />;
    }
    if (txType === "provide") {
      return <ProvideNotification txInfo={txInfo} />;
    }
    if (txType === "withdraw") {
      return <WithdrawNotification txInfo={txInfo} />;
    }
    if (txType === "stakeLp") {
      return <StakeLpNotification txInfo={txInfo} data={data} />;
    }
    if (txType === "unstakeLp") {
      return <UnstakeLpNotification txInfo={txInfo} data={data} />;
    }
    if (txType === "claimRewards") {
      return <ClaimRewardsNotification txInfo={txInfo} />;
    }
    if (txType === "auctionUnlockLp") {
      return <AuctionUnlockLpNotification txInfo={txInfo} />;
    }
    if (txType === "lockdropUnlockLp") {
      return <LockdropUnlockLpNotification txInfo={txInfo} data={data} />;
    }
    if (txType === "govStake") {
      return <GovStakeNotification txInfo={txInfo} />;
    }
    if (txType === "govUnstake") {
      return <GovUnstakeNotification txInfo={txInfo} />;
    }
  };

  return (
    <VStack zIndex={2000} position="absolute" top="0" right={["0", "2rem"]}>
      <AnimatePresence initial={false}>
        {notifications.items?.map(({ id, type, ...payload }) => {
          const onClose = () => {
            removeNotification({ notificationId: id });
          };

          switch (type) {
            case "started": {
              const { txHash, txType, data } = payload as TxNotificationPayload;

              return (
                <TransactionStartedNotification
                  key={id}
                  txHash={txHash}
                  txType={txType}
                  data={data}
                  onClose={onClose}
                />
              );
            }
            case "succeed": {
              const { txHash } = payload as TxNotificationPayload;

              return (
                <TransactionNotification
                  key={id}
                  txHash={txHash}
                  toastType="success"
                  onClose={onClose}
                >
                  {renderSuccessfulTxContent({ type, ...payload })}
                </TransactionNotification>
              );
            }
            case "failed": {
              const { txHash, txInfo } = payload as TxNotificationPayload;

              return (
                <TransactionNotification
                  key={id}
                  txHash={txHash}
                  toastType="error"
                  onClose={onClose}
                >
                  <FailedNotification txInfo={txInfo} />
                </TransactionNotification>
              );
            }
            case "error": {
              const { title, description } =
                payload as GenericNotificationPayload;

              return (
                <GenericNotification
                  key={id}
                  toastType={type}
                  title={title}
                  description={description}
                  onClose={onClose}
                />
              );
            }
            default:
              throw new Error("Unsupported notification type");
          }
        })}
      </AnimatePresence>
    </VStack>
  );
};

export default Notifications;
