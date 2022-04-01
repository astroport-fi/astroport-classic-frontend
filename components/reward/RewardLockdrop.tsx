import React, { FC } from "react";
import { Box, Text } from "@chakra-ui/react";

import { useContracts } from "modules/common";
import { usePhase1Rewards, usePhase2Rewards } from "modules/reward";

import RewardLineItem from "components/reward/RewardLineItem";

const RewardLockdrop: FC = () => {
  const { astroToken } = useContracts();
  const phase1Rewards = usePhase1Rewards();
  const phase2Rewards = usePhase2Rewards();
  const total =
    phase1Rewards +
    phase2Rewards.oneTimeRewards +
    phase2Rewards.ongoingEmissions;

  return (
    <Box mb="6">
      {total > 0 && (
        <Box mt={6}>
          <Text textStyle="minibutton" fontSize="xs">
            Your ASTRO Rewards
          </Text>
        </Box>
      )}

      {phase1Rewards > 0 && (
        <Box mt={4}>
          <RewardLineItem
            token={astroToken}
            amount={phase1Rewards}
            desc="ASTRO from Phase 1"
          />
        </Box>
      )}

      {phase2Rewards.oneTimeRewards > 0 && (
        <Box mt={4}>
          <RewardLineItem
            token={astroToken}
            amount={phase2Rewards.oneTimeRewards}
            desc="ASTRO from Phase 2"
          />
        </Box>
      )}

      {phase2Rewards.ongoingEmissions > 0 && (
        <Box mt={4}>
          <RewardLineItem
            token={astroToken}
            amount={phase2Rewards.ongoingEmissions}
            desc="ASTRO emissions from Phase 2"
          />
        </Box>
      )}
    </Box>
  );
};

export default RewardLockdrop;
