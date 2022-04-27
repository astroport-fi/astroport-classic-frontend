import React, { FC } from "react";
import { Text, Box, Flex, VStack, Tooltip } from "@chakra-ui/react";
import numeral from "numeral";
import { useTotalRewardValueInUst } from "modules/reward";
import InfoIcon from "components/icons/InfoIcon";
import { TOTAL_REWARDS_TOOLTIP } from "constants/constants";

const RewardTotal: FC = () => {
  const total = useTotalRewardValueInUst();
  const formatted = numeral(total).format("0,0.00");

  return (
    <Flex justify="space-between" align="flex-start">
      <Flex alignItems="center">
        <Text textStyle="minibutton" fontSize="xs" lineHeight="1">
          Total Rewards
        </Text>
        <Tooltip
          label={TOTAL_REWARDS_TOOLTIP}
          placement="top"
          aria-label="More info"
        >
          <Box ml="1" cursor="pointer" opacity={0.6}>
            <InfoIcon width="1rem" height="1rem" />
          </Box>
        </Tooltip>
      </Flex>
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
