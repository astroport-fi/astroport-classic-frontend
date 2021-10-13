import React, { FC } from "react";
import { Box, Text, Flex, Image, HStack } from "@chakra-ui/react";

import { useAstroswap, getTokenDenoms, useTokenInfo } from "modules/common";

type Props = {
  asset: string;
};

const SingleLP: FC<Props> = ({ asset }) => {
  const { pairs } = useAstroswap();
  const { getIcon, getSymbol } = useTokenInfo();
  //@ts-expect-error
  const pair = pairs.find((v) => v.liquidity_token == asset);
  //@ts-expect-error
  const [token1, token2] = getTokenDenoms(pair.asset_infos);
  // const lpTokenPrice = useLpTokenPrice(pair, String(ONE_TOKEN));
  const icon1 = getIcon(token1);
  const symbol1 = getSymbol(token1);
  const icon2 = getIcon(token2);
  const symbol2 = getSymbol(token2);

  return (
    <Box
      bg="white.100"
      color="white"
      display="flex"
      justify="center"
      align="center"
      borderRadius="full"
      borderWidth="1px"
      borderColor="white.200"
      textAlign="left"
      px="4"
      h="16"
      lineHeight="1.2"
      isFullWidth
    >
      <Flex align="center">
        <HStack spacing="-2">
          <Image src={icon1} width="1.5rem" height="1.5rem" alt="Logo" />
          <Image src={icon2} width="1.5rem" height="1.5rem" alt="Logo" />
        </HStack>

        <Box ml="3" fontWeight="500" flex="1">
          <Text fontSize="xl" color="white">
            {symbol1} - {symbol2}
          </Text>
          <Text fontSize="xs" color="white.400">
            Astro - Terra
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default SingleLP;
