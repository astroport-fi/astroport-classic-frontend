import React, { FC } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { fromTerraAmount } from "@arthuryeti/terra";

import { POOLS_TOKEN } from "constants/constants";
import { useTokenPriceInUst } from "modules/swap";

import Card from "components/Card";

const PoolsOverview: FC = () => {
  const price = useTokenPriceInUst(POOLS_TOKEN);

  return (
    <Card>
      <Flex justify="space-between">
        <Box>
          <Text fontWeight="500" fontSize="xl">
            $500,000,000
          </Text>
          <Text variant="light">Total Liquidity</Text>
        </Box>
        <Box>
          <Text fontWeight="500" fontSize="xl">
            $500,000,000
          </Text>
          <Text variant="light">24h Volume</Text>
        </Box>
        <Box>
          <Text fontWeight="500" fontSize="xl">
            ${fromTerraAmount(price)}
          </Text>
          <Text variant="light">ASTRO price</Text>
        </Box>
      </Flex>
    </Card>
  );
};

export default PoolsOverview;
