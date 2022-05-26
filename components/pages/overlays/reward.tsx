import React, { FC } from "react";
import { Box } from "@chakra-ui/react";
import RewardLockdrop from "components/reward/RewardLockdrop";
import { RewardBreakdown, RewardTotal } from "modules/reward";
import ClaimAllRewardsBtn from "components/reward/ClaimAllRewardsBtn";

type Props = {
  onClose?: () => void;
  type?: "modal" | "popover";
};

const Reward: FC<Props> = ({ onClose, type = "popover" }) => {
  return (
    <Box minW={type === "popover" ? "96" : "inherit"}>
      <RewardTotal />
      <RewardLockdrop />
      <RewardBreakdown />
      <ClaimAllRewardsBtn
        onSuccess={() => {
          onClose && onClose();
        }}
      />
    </Box>
  );
};

export default Reward;
