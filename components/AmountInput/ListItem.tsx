import React from "react";
import { Box, Text, Image, Flex, HStack, MenuItem } from "@chakra-ui/react";
import { fromTerraAmount, useBalance } from "@arthuryeti/terra";

import { useTokenPriceInUst } from "modules/swap";
import { format } from "libs/parse";
import { useTokenInfo } from "modules/common";

type Props = {
  token: string;
  onClick: (token: string) => void;
};

const ListItem = ({ token, onClick }: Props) => {
  const balance = useBalance(token);
  const price = useTokenPriceInUst(token);
  const { getIcon, getSymbol } = useTokenInfo();

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
          <Image src={getIcon(token)} alt={getSymbol(token)} boxSize="10" />
        </Box>
        <Box flex="1">
          <Text fontSize="xl" fontWeight="500" lineHeight="normal">
            {getSymbol(token)}
          </Text>
          <Text fontSize="sm" color="brand.dark" opacity="0.4">
            Terra
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
                {format(balance, "uusd")}
              </Text>
              <Text fontSize="sm" color="brand.dark" textAlign="right">
                {/* TODO: Fix type */}${fromTerraAmount(price as any)}
              </Text>
            </Box>
          </HStack>
        </Box>
      </Flex>
    </MenuItem>
  );
};

export default ListItem;
