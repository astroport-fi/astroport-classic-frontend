import React, { FC } from "react";
import { Flex, chakra, Text } from "@chakra-ui/react";

import MoneyStackIcon from "components/icons/MoneyStackIcon";

const RewardCenter: FC = () => {
  return (
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
        <Text fontSize="sm">$ 0.00</Text>
      </Flex>
    </chakra.button>
  );
};

export default RewardCenter;
