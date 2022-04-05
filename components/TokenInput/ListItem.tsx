import React from "react";
import { Box, Text, Image, Flex, HStack, chakra } from "@chakra-ui/react";
import {
  TokenInWallet,
  useTokenInfo,
  handleTinyAmount,
  handleBigAndTinyAmount,
} from "modules/common";
import { useTokenPriceInUstWithSimulate } from "modules/swap";

type Props = {
  token: TokenInWallet;
  onClick: (token: string) => void;
  style: React.CSSProperties;
};

// NOTE: The rendered height of this element must be configured
//       on the FixedSizeList itemSize in the List component.

const ListItem = ({ token, onClick, style }: Props) => {
  const { getIcon, getSymbol, getProtocol } = useTokenInfo();
  const balanceFormmated = handleBigAndTinyAmount(token.balance);
  const tokenPrice = useTokenPriceInUstWithSimulate(token.address);

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
      style={style}
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
                {balanceFormmated}
              </Text>
              <Text mt="1" fontSize="sm" textAlign="right" opacity={0.4}>
                {handleTinyAmount(tokenPrice, "0,0.00", false, "$")}
              </Text>
            </Box>
          </HStack>
        </Box>
      </Flex>
    </chakra.button>
  );
};

export default ListItem;
