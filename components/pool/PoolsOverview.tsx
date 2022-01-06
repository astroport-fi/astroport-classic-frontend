import React, { FC } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { fromTerraAmount } from "@arthuryeti/terra";

import { POOLS_TOKEN } from "constants/constants";
import { useTokenPriceInUstWithSimulate } from "modules/swap";

import Card from "components/Card";

const PoolsOverview: FC = () => {
  const price = useTokenPriceInUstWithSimulate(POOLS_TOKEN);

  return (
    <Card>
      <Flex justify="space-between">
        <Box>
          <Text textStyle="h3">$500,000,000</Text>
          <Text textStyle="small" variant="dimmed">
            Total Liquidity
          </Text>
        </Box>
        <Box>
          <Text textStyle="h3">$500,000,000</Text>
          <Text textStyle="small" variant="dimmed">
            24h Volume
          </Text>
        </Box>
        <Box>
          <Text textStyle="h3">${fromTerraAmount(price)}</Text>
          <Text textStyle="small" variant="dimmed">
            ASTRO price
          </Text>
        </Box>
      </Flex>
    </Card>
  );
};

export default PoolsOverview;
