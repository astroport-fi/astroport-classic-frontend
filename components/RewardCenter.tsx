import React, { FC } from "react";
import { Flex, chakra, Text } from "@chakra-ui/react";

import { useTotalRewardValueInUst } from "modules/reward";

import RewardCenterPopover from "components/popovers/RewardCenterPopover";
import MoneyStackIcon from "components/icons/MoneyStackIcon";
import numeral from "numeral";

const RewardCenter: FC = () => {
  const valueInUst = useTotalRewardValueInUst();
  const formatted = numeral(valueInUst).format("0,0.00");

  return (
    <RewardCenterPopover
      triggerElement={
        <chakra.button
          color="white"
          bg="brand.lightBlue"
          py="2"
          px="4"
          borderRadius="full"
          outline="none"
          minW="32"
        >
          <Flex justify="space-between" align="center">
            <MoneyStackIcon width="1.25rem" height="1.25rem" />
            <Text fontSize="sm">$ {formatted}</Text>
          </Flex>
        </chakra.button>
      }
    />
  );
};

export default RewardCenter;
