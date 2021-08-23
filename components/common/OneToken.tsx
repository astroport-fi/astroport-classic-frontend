import React, { FC } from "react";
import { Denom } from "@terra-money/terra.js";
import { Box, Text, Flex, Image, Button } from "@chakra-ui/react";

import { lookupSymbol, format } from "libs/parse";
import { useTokenPrice } from "modules/swap";
import { useTokenInfo } from "modules/terra";

type Props = {
  token: string;
};

const TokenSelect: FC<Props> = ({ token }) => {
  const { getIcon, getSymbol } = useTokenInfo();
  const price = useTokenPrice(token);
  const icon = getIcon(token);

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
        <Box>
          <Image src={icon} width="2.5rem" height="2.5rem" alt="Logo" />
        </Box>

        <Box ml="3" fontWeight="500" flex="1">
          <Text fontSize="2xl" color="white">
            {lookupSymbol(getSymbol(token))}
          </Text>
          <Text fontSize="xs" color="white.400">
            Price: ${format(price, Denom.USD)}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default TokenSelect;
