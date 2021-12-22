import React, { FC } from "react";
import {
  Box,
  Flex,
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";

import CloseIcon from "components/icons/CloseIcon";
import RewardList from "components/reward/RewardList";
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
      <RewardList />
      <ClaimAllRewardsBtn onSuccess={onClose} />
    </PopoverWrapper>
  );
};

export default RewardCenterPopover;
