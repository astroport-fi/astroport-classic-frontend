import React, { FC } from "react";
import { Text, Flex, VStack } from "@chakra-ui/react";
import numeral from "numeral";

import { useTotalRewardValueInUst } from "modules/reward";

const RewardTotal: FC = () => {
  const total = useTotalRewardValueInUst();
  const formatted = numeral(total).format("0,0.00");

  return (
    <Flex justify="space-between" align="flex-start">
      <Text textStyle="minibutton" fontSize="xs">
        Total Rewards
      </Text>
      <VStack align="flex-end" spacing={1} ml="8">
        <Text textStyle="h3" lineHeight="1">
          {formatted} UST
        </Text>
        <Text textStyle="small" variant="dimmed">
          Unclaimed Balance
        </Text>
      </VStack>
    </Flex>
  );
};

export default RewardTotal;
