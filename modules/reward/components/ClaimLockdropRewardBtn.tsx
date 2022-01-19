import React, { FC } from "react";
import { TxStep } from "@arthuryeti/terra";
import { Button } from "@chakra-ui/react";

import { useAstroswap } from "modules/common";
import { useClaimLockdropReward } from "modules/reward";

type Props = {
  contract: string;
  duration: number;
};

const ClaimLockdropRewardBtn: FC<Props> = ({ contract, duration }) => {
  const { addNotification } = useAstroswap();

  const state = useClaimLockdropReward({
    contract,
    duration,
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

  return (
    <Button
      size="sm"
      variant="primary"
      flex="1"
      onClick={state.submit}
      isDisabled={state.txStep != TxStep.Ready}
    >
      Claim Rewards
    </Button>
  );
};

export default ClaimLockdropRewardBtn;
