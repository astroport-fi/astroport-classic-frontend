import React, { FC } from "react";
import { Flex, chakra, Text } from "@chakra-ui/react";
import numeral from "numeral";

import { useTotalRewardValue } from "modules/reward";

import RewardCenterPopover from "components/popovers/RewardCenterPopover";
import MoneyStackIcon from "components/icons/MoneyStackIcon";

const RewardCenter: FC = () => {
  const totalValue = useTotalRewardValue();
  const formatted = numeral(totalValue).format("0,0.00");

  return (
    <RewardCenterPopover
      triggerElement={() => (
        <chakra.button
          color="white"
          bg="brand.lightBlue"
          py="2"
          px="4"
          borderRadius="full"
          outline="none"
          minW="40"
        >
          <Flex justify="space-between" align="center">
            <MoneyStackIcon width="1.25rem" height="1.25rem" />
            <Text fontSize="sm">{formatted} ASTRO</Text>
          </Flex>
        </chakra.button>
      )}
    />
  );
};

export default RewardCenter;
