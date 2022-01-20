import React, { FC } from "react";
import { useDisclosure, Box } from "@chakra-ui/react";

import RewardLockdrop from "components/reward/RewardLockdrop";
import { RewardBreakdown, RewardTotal } from "modules/reward";
import PopoverWrapper from "components/popovers/PopoverWrapper";
import ClaimAllRewardsBtn from "components/reward/ClaimAllRewardsBtn";
import { useQueryClient } from "react-query";

type Props = {
  triggerElement: () => React.ReactElement;
};

const RewardCenterPopover: FC<Props> = ({ triggerElement }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const queryClient = useQueryClient();

  const handleOpen = () => {
    queryClient.invalidateQueries("rewards");
    queryClient.invalidateQueries(["userInfo", "lockdrop"]);
    onOpen();
  };

  return (
    <PopoverWrapper
      title="Rewards"
      offset={[-115, -40]}
      isOpen={isOpen}
      onClose={onClose}
      onOpen={handleOpen}
      triggerElement={triggerElement}
    >
      <Box minW="96">
        <RewardTotal />
        <RewardLockdrop />
        <RewardBreakdown />
        <ClaimAllRewardsBtn onSuccess={onClose} />
      </Box>
    </PopoverWrapper>
  );
};

export default RewardCenterPopover;
