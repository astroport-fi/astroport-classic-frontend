import React, { FC } from "react";
import {
  useDisclosure,
  Text,
  Popover,
  PopoverContent,
  PopoverBody,
  PopoverTrigger,
  Flex,
} from "@chakra-ui/react";
import { handleBigPercentage } from "modules/common";
import { Rewards } from "modules/pool";

type Props = {
  rewards: Rewards;
};

const RewardsPopover: FC<Props> = ({ rewards, children }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const rows = [
    { label: "Pool APY", value: handleBigPercentage(rewards.pool * 100) },
    {
      label: "Astro Generator APR",
      value: handleBigPercentage(rewards.astro * 100),
    },
    rewards.token_symbol && {
      label: `${rewards.token_symbol} Reward  APR`,
      value: handleBigPercentage(rewards.protocol * 100),
    },
    { label: "Total APR", value: handleBigPercentage(rewards.total * 100) },
  ].filter(Boolean);

  return (
    <Popover
      placement="bottom-start"
      isOpen={isOpen && rewards.total > 0}
      onOpen={onOpen}
      onClose={onClose}
      trigger="hover"
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent
        paddingX="12px"
        paddingY="12px !important"
        bg="#0c516d"
        borderColor="rgba(255, 255, 255, 0.1)"
        border="2px"
        borderRadius="4px"
        boxShadow="4px 4px 10px rgba(0, 13, 55, 0.5)"
      >
        <PopoverBody border={2}>
          {rows.map((row) => (
            <Flex key={row.label}>
              <Text flex={1} fontSize="xs" color="#fff">
                {row.label}
              </Text>
              <Text
                pl="2"
                w="16"
                align="right"
                fontSize="xs"
                color="rgba(255, 255, 255, 0.6)"
              >
                {row.value}
              </Text>
            </Flex>
          ))}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default RewardsPopover;
