import React, { FC } from "react";
import { Box, Text, Flex, VStack } from "@chakra-ui/react";
import numeral from "numeral";

import { useContracts } from "modules/common";
import { usePhase1Rewards, usePhase2Rewards } from "modules/reward";
import { useAirdropBalance } from "modules/airdrop";

import RewardLineItem from "components/reward/RewardLineItem";

const RewardList: FC = () => {
  const { astroToken } = useContracts();
  const phase1Rewards = usePhase1Rewards();
  const phase2Rewards = usePhase2Rewards();
  const airdropBalance = useAirdropBalance();
  const airdrop = numeral(airdropBalance).format("0,0.00");
  const phase1 = numeral(phase1Rewards).format("0,0.00");
  const phase2 = numeral(phase2Rewards).format("0,0.00");
  const total = airdropBalance + phase1Rewards + phase2Rewards;
  const totalFormatted = numeral(total).format("0,0.00");

  return (
    <Box>
      <Flex justify="space-between" align="flex-start">
        <Text textStyle="minibutton" fontSize="xs">
          Total Rewards
        </Text>
        <VStack align="flex-end" spacing={1}>
          <Text textStyle="h3" lineHeight="1">
            $ {totalFormatted}
          </Text>
          <Text textStyle="small" variant="dimmed">
            Unclaimed Balance
          </Text>
        </VStack>
      </Flex>

      <Box mt={6}>
        <Text textStyle="minibutton">Your ASTRO Airdrop</Text>
        <RewardLineItem token={astroToken} amount={airdrop} />
      </Box>

      <Box mt={6}>
        <Text textStyle="minibutton">Your lockdrop phase 1 rewards</Text>
        <RewardLineItem token={astroToken} amount={phase1} />
      </Box>

      <Box mt={6}>
        <Text textStyle="minibutton">Your lockdrop phase 2 rewards</Text>
        <RewardLineItem token={astroToken} amount={phase2} />
      </Box>
    </Box>
  );
};

export default RewardList;
