import React, { FC } from "react";
import { useDisclosure } from "@chakra-ui/react";

import RewardLockdrop from "components/reward/RewardLockdrop";
import RewardBreakdown from "components/reward/RewardBreakdown";
import PopoverWrapper from "components/popovers/PopoverWrapper";
import ClaimAllRewardsBtn from "components/reward/ClaimAllRewardsBtn";

type Props = {
  triggerElement: () => React.ReactElement;
};

const RewardCenterPopover: FC<Props> = ({ triggerElement }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <PopoverWrapper
      title="Rewards"
      offset={[-115, -40]}
      // placement="left"
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      triggerElement={triggerElement}
    >
      <RewardLockdrop />
      <RewardBreakdown />
      <ClaimAllRewardsBtn onSuccess={onClose} />
    </PopoverWrapper>
  );
};

export default RewardCenterPopover;
