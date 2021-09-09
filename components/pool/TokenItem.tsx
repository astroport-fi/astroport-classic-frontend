import React from "react";
import { Denom } from "@terra-money/terra.js";
import { Box, Text, Image, Flex, HStack, MenuItem } from "@chakra-ui/react";

import { useBalance } from "@arthuryeti/terra";
import { useTokenPrice } from "modules/swap";
import { format } from "libs/parse";

const TokenItem = ({ token, onClick }) => {
  const { icon, symbol, protocol } = token;
  const balance = useBalance(token.token);
  const price = useTokenPrice(token.token);

  return (
    <MenuItem
      transition="0.2s all"
      type="button"
      outline="none"
      textAlign="left"
      p="0"
      _hover={{
        bg: "white.500",
      }}
      onClick={() => onClick(token)}
    >
      <Flex align="center" justify="space-between" py="2.5" w="full">
        <Box mr="2">
          <Image src={icon} alt={symbol} boxSize="10" />
        </Box>
        <Box flex="1">
          <Text fontSize="xl" fontWeight="500" lineHeight="normal">
            {symbol}
          </Text>
          <Text fontSize="sm" color="brand.dark" opacity="0.4">
            {protocol}
          </Text>
        </Box>
        <Box>
          <HStack>
            <Box>
              <Text fontSize="sm" color="brand.dark" opacity="0.4">
                Balance:
              </Text>
              <Text fontSize="sm" color="brand.dark" opacity="0.4">
                Price:
              </Text>
            </Box>
            <Box minW="24">
              <Text fontSize="sm" color="brand.dark" textAlign="right">
                {format(balance, symbol)}
              </Text>
              <Text fontSize="sm" color="brand.dark" textAlign="right">
                ${format(price, Denom.USD)}
              </Text>
            </Box>
          </HStack>
        </Box>
      </Flex>
    </MenuItem>
  );
};

export default TokenItem;
