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
import ClaimAllRewardsBtn from "components/reward/ClaimAllRewardsBtn";

type Props = {
  triggerElement: React.ReactElement;
};

const RewardCenterPopover: FC<Props> = ({ triggerElement }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Popover
      placement="left-end"
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
    >
      <PopoverTrigger>{triggerElement}</PopoverTrigger>
      <PopoverContent color="brand.deepBlue">
        <Flex align="center" justify="space-between" mb="4" pr={6}>
          <PopoverHeader>Rewards</PopoverHeader>
          <PopoverCloseButton position="static" borderRadius="xl">
            <CloseIcon w="6" h="6" />
          </PopoverCloseButton>
        </Flex>
        <PopoverBody>
          <Box width="sm" px={6}>
            <RewardList />
            <ClaimAllRewardsBtn onSuccess={onClose} />
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default RewardCenterPopover;
