import React, { FC } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { ASTRO_TOKEN } from "constants/constants";
import { useAllPools } from "modules/pool";
import { useTokenPriceInUstWithSimulate } from "modules/swap";
import { handleTinyAmount } from "modules/common";
import Card from "components/Card";

const PoolsOverview: FC = () => {
  const allPools = useAllPools();
  const totalLiquidity = allPools.reduce(
    (total, pool) => total + (pool.totalLiquidityInUst || 0),
    0
  );
  const dailyVolume = allPools.reduce(
    (total, pool) => total + (pool._24hr_volume || 0),
    0
  );
  const price = useTokenPriceInUstWithSimulate(ASTRO_TOKEN);

  return (
    <Card>
      <Flex justify="space-between">
        <Box>
          <Text textStyle="h3">
            {handleTinyAmount(totalLiquidity, "0,0", undefined, " UST")}
          </Text>
          <Text textStyle="small" variant="dimmed">
            Total Liquidity
          </Text>
        </Box>
        <Box>
          <Text textStyle="h3">
            {handleTinyAmount(dailyVolume, "0,0", undefined, " UST")}
          </Text>
          <Text textStyle="small" variant="dimmed">
            24h Volume
          </Text>
        </Box>
        <Box>
          <Text textStyle="h3">
            {handleTinyAmount(price, undefined, undefined, " UST")}
          </Text>
          <Text textStyle="small" variant="dimmed">
            ASTRO price
          </Text>
        </Box>
      </Flex>
    </Card>
  );
};

export default PoolsOverview;
