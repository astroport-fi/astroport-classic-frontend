import React from "react";
import { Box, Text, Image, Flex, HStack, chakra } from "@chakra-ui/react";
import { fromTerraAmount, num, useBalance } from "@arthuryeti/terra";

import { useTokenPriceInUst } from "modules/swap";
import { useTokenInfo } from "modules/common";

type Props = {
  token: string;
  onClick: (token: string) => void;
};

const ListItem = ({ token, onClick }: Props) => {
  const { getIcon, getSymbol, getDecimals } = useTokenInfo();
  const balance = useBalance(token);
  const price = useTokenPriceInUst(token).toFixed(2);
  const tokenBalance = num(balance)
    .div(10 ** getDecimals(token))
    .dp(2)
    .toNumber();

  return (
    <chakra.button
      type="button"
      transition="0.2s all"
      outline="none"
      textAlign="left"
      display="flex"
      w="100%"
      p="0"
      pr="2"
      color="brand.dark"
      _hover={{
        color: "brand.purple",
      }}
      onClick={() => onClick(token)}
    >
      <Flex align="center" justify="space-between" py="2.5" w="full">
        <Box mr="3">
          <Image src={getIcon(token)} alt={getSymbol(token)} boxSize="8" />
        </Box>
        <Box flex="1">
          <Text fontSize="xl" fontWeight="500" lineHeight="normal">
            {getSymbol(token)}
          </Text>
          <Text mt="-1" fontSize="sm" opacity="0.4">
            Terra
          </Text>
        </Box>
        <Box>
          <HStack>
            <Box>
              <Text fontSize="sm" opacity="0.4">
                In wallet:
              </Text>
              <Text fontSize="sm" opacity="0.4">
                Price:
              </Text>
            </Box>
            <Box minW="24">
              <Text fontSize="sm" textAlign="right">
                {tokenBalance}
              </Text>
              <Text mt="1" fontSize="sm" textAlign="right" opacity={0.4}>
                ${price}
              </Text>
            </Box>
          </HStack>
        </Box>
      </Flex>
    </chakra.button>
  );
};

export default ListItem;
