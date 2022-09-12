import React, { FC } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Token, useAstroswap, useTokenInfo } from "modules/common";

type Props = {
  token: string;
};

const TokenItem: FC<Props> = ({ token: token_address }) => {
  const { tokens } = useAstroswap();
  const { getIcon, getSymbol, getProtocol } = useTokenInfo();
  const token = Object.values(tokens || {}).find(
    (t: Token) => t.token === token_address
  );

  if (!token) return null;

  return (
    <Flex
      align="center"
      justify="space-between"
      py="2.5"
      px="2"
      w="full"
      rounded="lg"
      _hover={{ bg: "whiteAlpha.300" }}
    >
      <Box mr="3">
        <Image
          src={getIcon(token.token)}
          alt={getSymbol(token.token)}
          boxSize="8"
        />
      </Box>
      <Box flex="1" textAlign="left">
        <Text fontSize="xl" fontWeight="500" lineHeight="normal">
          {getSymbol(token.token)}
        </Text>
        <Text mt="-1" fontSize="sm" opacity="0.4">
          {getProtocol(token.token)}
        </Text>
      </Box>
    </Flex>
  );
};

export default TokenItem;
