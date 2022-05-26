import React, { FC } from "react";
import { Button } from "@chakra-ui/react";

import { useTx } from "modules/common";
import { useClaimAuctionReward } from "modules/reward";
import useEstimateFee from "hooks/useEstimateFee";

type Props = {
  amount: string;
  txFeeNotEnough?: boolean;
  style?: "mobile" | "desktop";
};

const StyleProps = (style: "mobile" | "desktop") => {
  if (style === "desktop") {
    return { variant: "primary", size: "sm", flex: "1" };
  } else {
    return {
      variant: "simple",
      fontWeight: "500",
      fontSize: ".875rem",
      color: "brand.purpleAlt",
      textDecoration: "underline",
      flex: "1",
      _hover: { color: "brand.purpleAlt" },
      _focus: { color: "brand.purpleAlt" },
      _active: { color: "brand.purpleAlt" },
    };
  }
};

const ClaimAuctionRewardBtn: FC<Props> = ({
  amount,
  txFeeNotEnough,
  style = "desktop",
}) => {
  const { msgs } = useClaimAuctionReward({ amount });

  const { submit } = useTx({
    notification: {
      type: "claimRewards",
    },
  });

  // when not withdrawing lp, msgs amount = 0. This resuts in an error
  // when estimating fee. So we need to set msgs amount to 1 in useFeeEstimate.
  const { msgs: msgsFeeEstimate } = useClaimAuctionReward({ amount: "1" });

  const { fee } = useEstimateFee({
    msgs: msgsFeeEstimate,
    gasAdjustment: 1.4,
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
      {...StyleProps(style)}
      onClick={handleClick}
      isDisabled={fee == null || !!txFeeNotEnough}
    >
      Claim Rewards
    </Button>
  );
};

export default ClaimAuctionRewardBtn;
