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

const ClaimLockdropRewardBtn: FC<Props> = ({
  contract,
  duration,
  txFeeNotEnough,
  style = "desktop",
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
      {...StyleProps(style)}
      onClick={handleClick}
      isDisabled={fee == null || !!txFeeNotEnough}
    >
      Claim Rewards
    </Button>
  );
};

export default ClaimLockdropRewardBtn;
