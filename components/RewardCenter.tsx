import React, { FC } from "react";
import { Flex, chakra, Text } from "@chakra-ui/react";

import { useTotalRewardValueInUst } from "modules/reward";
import { handleBigAndTinyAmount } from "modules/common";

import RewardCenterPopover from "components/popovers/RewardCenterPopover";
import MoneyStackIcon from "components/icons/MoneyStackIcon";

const RewardCenter: FC = () => {
  const totalValue = useTotalRewardValueInUst();
  const formatted = handleBigAndTinyAmount(totalValue);

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
            <Text fontSize="sm">{formatted} UST</Text>
          </Flex>
        </chakra.button>
      )}
    />
  );
};

export default RewardCenter;
