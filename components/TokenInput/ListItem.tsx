import React from "react";
import { Box, Text, Image, Flex, HStack, chakra } from "@chakra-ui/react";
import { TokenInWallet, useTokenInfo } from "modules/common";

type Props = {
  token: TokenInWallet;
  onClick: (token: string) => void;
};

const ListItem = ({ token, onClick }: Props) => {
  const { getIcon, getSymbol, getProtocol } = useTokenInfo();

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
      onClick={() => onClick(token.address)}
    >
      <Flex align="center" justify="space-between" py="2.5" w="full">
        <Box mr="3">
          <Image
            src={getIcon(token.address)}
            alt={getSymbol(token.address)}
            boxSize="8"
          />
        </Box>
        <Box flex="1">
          <Text fontSize="xl" fontWeight="500" lineHeight="normal">
            {getSymbol(token.address)}
          </Text>
          <Text mt="-1" fontSize="sm" opacity="0.4">
            {getProtocol(token.address)}
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
                {token.balance}
              </Text>
              <Text mt="1" fontSize="sm" textAlign="right" opacity={0.4}>
                ${token.price.toFixed(2)}
              </Text>
            </Box>
          </HStack>
        </Box>
      </Flex>
    </chakra.button>
  );
};

export default ListItem;
