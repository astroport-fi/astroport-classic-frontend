import React, { FC } from "react";
import { useEstimateFee } from "@arthuryeti/terra";
import { Button } from "@chakra-ui/react";

import { useTx } from "modules/common";
import { useClaimAuctionReward } from "modules/reward";

type Props = {
  amount: string;
  txFeeNotEnough?: boolean;
};

const ClaimAuctionRewardBtn: FC<Props> = ({ amount, txFeeNotEnough }) => {
  const { msgs } = useClaimAuctionReward({ amount });

  const { submit } = useTx({
    notification: {
      type: "claimRewards",
    },
  });

  const { fee } = useEstimateFee({
    msgs,
    gasAdjustment: 1.5,
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

export default ClaimAuctionRewardBtn;
