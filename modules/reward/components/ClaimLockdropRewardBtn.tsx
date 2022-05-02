import React, { FC } from "react";
import { useEstimateFee } from "@arthuryeti/terra";
import { Button } from "@chakra-ui/react";

import { useTx } from "modules/common";
import { useClaimLockdropReward } from "modules/reward";
import useEstimateFee from "hooks/useEstimateFee";

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
  const { msgs } = useClaimLockdropReward({
    contract,
    duration,
  });

  const { submit } = useTx({
    notification: {
      type: "claimRewards",
    },
  });

  const { fee } = useEstimateFee({
    msgs,
  });

  const handleClick = () => {
    if (msgs && fee) {
      submit({
        msgs,
        fee,
      });
    }
  };

  return (
    <Button
      size="sm"
      variant="primary"
      flex="1"
      onClick={handleClick}
      isDisabled={fee == null || !!txFeeNotEnough}
    >
      Claim Rewards
    </Button>
  );
};

export default ClaimLockdropRewardBtn;
