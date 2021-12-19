import React from "react";
import { Box, Text, Image, Flex, HStack, chakra } from "@chakra-ui/react";
import { fromTerraAmount, useBalance } from "@arthuryeti/terra";

import { useTokenPriceInUst } from "modules/swap";
import { useTokenInfo } from "modules/common";

type Props = {
  token: string;
  onClick: (token: string) => void;
};

const ListItem = ({ token, onClick }: Props) => {
  const { getIcon, getSymbol } = useTokenInfo();
  const balance = useBalance(token);
  const price = useTokenPriceInUst(token);

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
        <Box mr="2">
          <Image src={getIcon(token)} alt={getSymbol(token)} boxSize="10" />
        </Box>
        <Box flex="1">
          <Text fontSize="xl" fontWeight="500" lineHeight="normal">
            {getSymbol(token)}
          </Text>
          <Text fontSize="sm" opacity="0.4">
            Terra
          </Text>
        </Box>
        <Box>
          <HStack>
            <Box>
              <Text fontSize="sm" opacity="0.4">
                Balance:
              </Text>
              <Text fontSize="sm" opacity="0.4">
                Price:
              </Text>
            </Box>
            <Box minW="24">
              <Text fontSize="sm" textAlign="right">
                {fromTerraAmount(balance, "0,0.000")}
              </Text>
              <Text fontSize="sm" textAlign="right">
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
