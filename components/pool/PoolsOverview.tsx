import React, { FC } from "react";
import { Box, Flex, Text, Heading } from "@chakra-ui/react";

import Card from "components/Card";
import { POOLS_TOKEN } from "constants/constants";
import { useTokenPrice } from "modules/swap";
import { formatAmount } from "@arthuryeti/terra";

type Props = {
  totalLiquidity: string | null;
};

const PoolsOverview: FC<Props> = ({ totalLiquidity }) => {
  const price = useTokenPrice(POOLS_TOKEN);

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
            ${formatAmount(price)}
          </Text>
          <Text variant="light">ASTRO price</Text>
        </Box>
      </Flex>
    </Card>
  );
};

export default PoolsOverview;
