import React, { FC } from "react";
import { Box, Text, Flex, Image, HStack } from "@chakra-ui/react";

import { format } from "libs/parse";
import { useLpTokenPrice } from "modules/pool";
import { ONE_TOKEN } from "constants/constants";
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
  //@ts-expect-error
  const lpTokenPrice = useLpTokenPrice(pair, String(ONE_TOKEN));
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
        <HStack spacing="-4">
          <Image src={icon1} width="2.5rem" height="2.5rem" alt="Logo" />
          <Image src={icon2} width="2.5rem" height="2.5rem" alt="Logo" />
        </HStack>

        <Box ml="3" fontWeight="500" flex="1">
          <Text fontSize="2xl" color="white">
            {symbol1} - {symbol2}
          </Text>
          <Text fontSize="xs" color="white.400">
            Price: ${format(lpTokenPrice, "uusd")}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default SingleLP;
