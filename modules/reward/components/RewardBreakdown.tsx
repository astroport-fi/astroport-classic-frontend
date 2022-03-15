import React, { FC } from "react";
import { Box, Text, Flex, Switch } from "@chakra-ui/react";

import { useBreakdownRewardsInUst } from "modules/reward";

import RewardLineItem from "components/reward/RewardLineItem";
import useLocalStorage from "hooks/useLocalStorage";

const RewardBreakdown: FC = () => {
  const [renderPrice, setRenderPrice] = useLocalStorage("renderPrice", true);
  const rewardsInUst = useBreakdownRewardsInUst();

  if (rewardsInUst.length === 0) {
    return null;
  }

  return (
    <Box>
      <Flex justify="space-between" align="center">
        <Text textStyle="minibutton" fontSize="xs">
          Rewards BreakDown
        </Text>
        <Flex justify="space-between" align="center">
          <Text textStyle="small" variant="dimmed">
            {renderPrice ? "With price" : "Without price"}
          </Text>
          <Switch
            isChecked={renderPrice}
            onChange={(e) => setRenderPrice(!renderPrice)}
            ml="2"
            height="22px"
          />
        </Flex>
      </Flex>
      <Box maxH="300" py="2" overflowY="auto">
        {rewardsInUst.map((reward) => (
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
