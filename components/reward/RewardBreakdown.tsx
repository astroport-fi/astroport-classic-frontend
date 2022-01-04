import React, { FC } from "react";
import { Box, Text, Flex, VStack } from "@chakra-ui/react";
import numeral from "numeral";

import { useContracts } from "modules/common";
import {
  usePhase1Rewards,
  usePhase2Rewards,
  useTotalRewardValue,
  useBreakdownRewards,
} from "modules/reward";
import { useAirdropBalance } from "modules/airdrop";

import RewardLineItem from "components/reward/RewardLineItem";

const RewardBreakdown: FC = () => {
  const { astroToken } = useContracts();
  const rewards = useBreakdownRewards();

  return (
    <Box>
      <Flex justify="space-between" align="flex-start">
        <Text textStyle="minibutton" fontSize="xs">
          Total Rewards
        </Text>
      </Flex>
    </Box>
  );
};

export default RewardBreakdown;
