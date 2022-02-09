import React, { FC } from "react";
import { TxStep, useTx, useEstimateFee } from "@arthuryeti/terra";
import { Button } from "@chakra-ui/react";

import { useAstroswap } from "modules/common";
import { useClaimLockdropReward } from "modules/reward";

type Props = {
  contract: string;
  duration: number;
  txFeeNotEnough?: boolean;
};

const ClaimLockdropRewardBtn: FC<Props> = ({
  contract,
  duration,
  txFeeNotEnough,
}) => {
  const { addNotification } = useAstroswap();

  const { msgs } = useClaimLockdropReward({
    contract,
    duration,
  });

  const { submit } = useTx({
    onBroadcasting: (txHash) => {
      addNotification({
        notification: {
          type: "started",
          txHash,
          txType: "claimRewards",
        },
      });
    },
  });

  const { fee } = useEstimateFee({
    msgs,
  });

  const handleClick = () => {
    submit({
      msgs,
      fee,
    });
  };

  return (
    <Button
      size="sm"
      variant="primary"
      flex="1"
      onClick={handleClick}
      isDisabled={fee == null || txFeeNotEnough}
    >
      Claim Rewards
    </Button>
  );
};

export default ClaimLockdropRewardBtn;
