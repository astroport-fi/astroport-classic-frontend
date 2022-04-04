import React, { FC } from "react";
import { Box, Text, Flex, Switch } from "@chakra-ui/react";

import RewardLineItem from "components/reward/RewardLineItem";
import useLocalStorage from "hooks/useLocalStorage";
import { useBreakdownRewardsToShow } from "modules/reward/hooks/useBreakdownRewardsToShow";

const RewardBreakdown: FC = () => {
  const [renderRewardsWithPrice, setRenderRewardsWithPrice] = useLocalStorage(
    "renderRewardsWithPrice",
    true
  );
  const { rewards, renderSwitch } = useBreakdownRewardsToShow();

  if (rewards.length === 0) {
    return null;
  }

  return (
    <Box>
      <Flex justify="space-between" align="center">
        <Text textStyle="minibutton" fontSize="xs">
          Rewards Breakdown
        </Text>
        {renderSwitch && (
          <Flex justify="space-between" align="center">
            <Text textStyle="small" variant="dimmed">
              {renderRewardsWithPrice ? "With price" : "Without price"}
            </Text>
            <Switch
              isChecked={renderRewardsWithPrice}
              onChange={(e) =>
                setRenderRewardsWithPrice(!renderRewardsWithPrice)
              }
              ml="2"
              height="22px"
            />
          </Flex>
        )}
      </Flex>
      <Box maxH="300" mt="3" overflowY="auto">
        {rewards.map((reward) => (
          <RewardLineItem
            key={reward.token}
            token={reward.token}
            amount={reward.amount}
          />
        ))}
      </Box>
    </Box>
  );
};

export default RewardBreakdown;
