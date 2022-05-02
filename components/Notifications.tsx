import React, { FC } from "react";
import { VStack } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";

import {
  useAstroswap,
  TxNotificationPayload,
  GenericNotificationPayload,
} from "modules/common";

import TransactionNotification from "components/notifications/Transaction";
import TransactionStarted from "components/notifications/TransactionStarted";
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
import CreateProposalNotification from "components/notifications/CreateProposalNotification";
import GovVoteNotification from "components/notifications/GovVoteNotification";

const Notifications: FC = () => {
  const { notifications, removeNotification } = useAstroswap();

  const renderSuccessfulTxContent = ({ txInfo, txType, data }: any) => {
    const props = { txInfo, data };

    const mapTxType: any = {
      swap: <SwapNotification {...props} />,
      provide: <ProvideNotification {...props} />,
      withdraw: <WithdrawNotification {...props} />,
      stakeLp: <StakeLpNotification txInfo={txInfo} />,
      unstakeLp: <UnstakeLpNotification {...props} />,
      lockdropUnlockLp: <LockdropUnlockLpNotification {...props} />,
      govStake: <GovStakeNotification txInfo={txInfo} />,
      govUnstake: <GovUnstakeNotification txInfo={txInfo} />,
      claimRewards: <ClaimRewardsNotification />,
      auctionUnlockLp: <AuctionUnlockLpNotification txInfo={txInfo} />,
      createProposal: <CreateProposalNotification {...props} />,
      govVote: <GovVoteNotification {...props} />,
    };

    return mapTxType[txType];
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
                <TransactionStarted
                  key={id}
                  txHash={txHash}
                  txType={txType || ""}
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
                  {renderSuccessfulTxContent({ ...payload })}
                </TransactionNotification>
              );
            }
            case "failed": {
              const { txHash, txInfo } = payload as TxNotificationPayload;

              if (!txInfo) return null;

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
                  description={description || ""}
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
