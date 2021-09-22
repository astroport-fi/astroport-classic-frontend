import React, { FC } from "react";
import { Denom } from "@terra-money/terra.js";
import { Box, Text, Image, Flex, HStack, MenuItem } from "@chakra-ui/react";
import { useTokenInfo, getTokenDenoms } from "@arthuryeti/terra";

import { format } from "libs/parse";
import { useBalance } from "hooks/useBalance";
import { Pair } from "types/common";

type Props = {
  pair: Pair;
  onClick: (v: string) => void;
};

const ListLPItem: FC<Props> = ({ pair, onClick }) => {
  const { getIcon, getSymbol } = useTokenInfo();
  const balance = useBalance(pair.contract);
  const [token1, token2] = getTokenDenoms(pair.asset_infos);
  const icon1 = getIcon(token1);
  const symbol1 = getSymbol(token1);
  const icon2 = getIcon(token2);
  const symbol2 = getSymbol(token2);

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
      onClick={() => onClick(pair.lpToken)}
    >
      <Flex align="center" justify="space-between" py="2.5" w="full">
        <Box mr="2">
          <HStack spacing="-4">
            <Image src={icon1} boxSize="10" alt="Logo" />
            <Image src={icon2} boxSize="10" alt="Logo" />
          </HStack>
        </Box>
        <Box flex="1">
          <Text fontSize="xl" fontWeight="500" lineHeight="normal">
            {symbol1} - {symbol2}
          </Text>
          <Text fontSize="sm" color="brand.dark" opacity="0.4">
            LP Token
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
                {format(balance, Denom.USD)}
              </Text>
              <Text fontSize="sm" color="brand.dark" textAlign="right">
                ${format("0", Denom.USD)}
              </Text>
            </Box>
          </HStack>
        </Box>
      </Flex>
    </MenuItem>
  );
};

export default ListLPItem;
