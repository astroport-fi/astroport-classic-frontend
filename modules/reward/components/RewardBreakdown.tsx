import React, { FC } from "react";
import { Box, Text, Flex, VStack } from "@chakra-ui/react";
import numeral from "numeral";

import { useContracts } from "modules/common";
import {
  usePhase1Rewards,
  usePhase2Rewards,
  useTotalRewardValueInUst,
  useBreakdownRewards,
  useBreakdownRewardsInUst,
} from "modules/reward";

import RewardLineItem from "components/reward/RewardLineItem";

const RewardBreakdown: FC = () => {
  const rewardsInUst = useBreakdownRewardsInUst();

  if (rewardsInUst.length === 0) {
    return null;
  }

  return (
    <Box>
      <Flex justify="space-between" align="flex-start">
        <Text textStyle="minibutton" fontSize="xs">
          Rewards BreakDown
        </Text>
      </Flex>

      {rewardsInUst.map((reward) => (
        <RewardLineItem
          key={reward.token}
          token={reward.token}
          amount={reward.amount}
        />
      ))}
    </Box>
  );
};

export default RewardBreakdown;
