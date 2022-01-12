import React, { FC } from "react";
import { VStack } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";

import { useAstroswap } from "modules/common";

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

const Notifications: FC = () => {
  const { notifications, removeNotification } = useAstroswap();

  const renderContent = ({ txInfo, txType, type, data }: any) => {
    if (type === "started") {
      return;
    }
    if (type === "failed") {
      return <FailedNotification txInfo={txInfo} />;
    }
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
      return <StakeLpNotification txInfo={txInfo} />;
    }
    if (txType === "unstakeLp") {
      return <UnstakeLpNotification txInfo={txInfo} />;
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
        {notifications.items?.map(
          ({ id, txHash, txInfo, txType, type, data }) => {
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
                data={data}
                onClose={() => {
                  removeNotification({ notificationId: id });
                }}
              >
                {renderContent({ txHash, txInfo, txType, type, data })}
              </Component>
            );
          }
        )}
      </AnimatePresence>
    </VStack>
  );
};

export default Notifications;
