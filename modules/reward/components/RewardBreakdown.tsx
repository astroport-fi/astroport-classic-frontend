import React, { FC } from "react";
import { Box, Text, Flex, Switch } from "@chakra-ui/react";

import { useBreakdownRewardsInUst } from "modules/reward";

import RewardLineItem from "components/reward/RewardLineItem";
import useLocalStorage from "hooks/useLocalStorage";

const RewardBreakdown: FC = () => {
  const [renderRewardsWithPrice, setRenderRewardsWithPrice] = useLocalStorage(
    "renderRewardsWithPrice",
    true
  );
  const rewardsInUst = useBreakdownRewardsInUst();

  if (rewardsInUst.length === 0) {
    return null;
  }

  const renderSwitch = rewardsInUst.filter((r) => r.price === 0).length > 0;
  const rewardsToShow =
    renderSwitch && renderRewardsWithPrice === false
      ? rewardsInUst.filter((r) => r.price === 0)
      : rewardsInUst.filter((r) => r.price !== 0);
  return (
    <Box>
      <Flex justify="space-between" align="center">
        <Text textStyle="minibutton" fontSize="xs">
          Rewards BreakDown
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
      <Box maxH="300" py="2" overflowY="auto">
        {rewardsToShow.map((reward) => (
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
