import React, { FC } from "react";
import { useMediaQuery, Box, Flex, Text } from "@chakra-ui/react";
import Glider from "react-glider";
import { MOBILE_MAX_WIDTH } from "constants/constants";
import { useAllPools } from "modules/pool";
import { useTokenPriceInUstWithSimulate } from "modules/swap";
import { handleTinyAmount, useContracts } from "modules/common";

import Card from "components/Card";
import BoxGradient from "components/BoxGradient";

import "glider-js/glider.min.css";

type Props = {
  value: string;
  desc: string;
};

const MobileComponent: FC<Props> = ({ value, desc }) => {
  return (
    <Box px="1">
      <BoxGradient>
        <Flex
          flexDirection="column"
          align="center"
          justifyContent="center"
          height="120px"
        >
          <Text textStyle="h3">{value}</Text>
          <Text textStyle="small" mt="3" color="brand.purpleAlt">
            {desc}
          </Text>
        </Flex>
      </BoxGradient>
    </Box>
  );
};

const Component: FC<Props> = ({ value, desc }) => {
  return (
    <Box>
      <Text textStyle="h3">{value}</Text>
      <Text textStyle="small" variant="dimmed">
        {desc}
      </Text>
    </Box>
  );
};

const PoolsOverview: FC = () => {
  const [isMobile] = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH})`);
  const allPools = useAllPools();

  const totalLiquidity = allPools.reduce(
    (total, pool) => total + (pool.totalLiquidityInUst || 0),
    0
  );
  const dailyVolume = allPools.reduce(
    (total, pool) => total + (pool._24hr_volume || 0),
    0
  );
  const { astroToken } = useContracts();
  const price = useTokenPriceInUstWithSimulate(astroToken);

  const totalLiquidityValue = handleTinyAmount(
    totalLiquidity,
    "0,0",
    undefined,
    " UST"
  );
  const volumeValue = handleTinyAmount(dailyVolume, "0,0", undefined, " UST");
  const priceValue = handleTinyAmount(price, undefined, undefined, " UST");

  return isMobile ? (
    <Glider
      draggable
      hasDots
      slidesToShow={1}
      slidesToScroll={1}
      scrollLock={true}
    >
      <MobileComponent value={totalLiquidityValue} desc="Total Liquidity" />
      <MobileComponent value={volumeValue} desc="24h Volume" />
      <MobileComponent value={priceValue} desc="ASTRO Price" />
    </Glider>
  ) : (
    <Card>
      <Flex justify="space-between">
        <Component value={totalLiquidityValue} desc="Total Liquidity" />
        <Component value={volumeValue} desc="24h Volume" />
        <Component value={priceValue} desc="ASTRO Price" />
      </Flex>
    </Card>
  );
};

export default PoolsOverview;
