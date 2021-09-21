import React, { FC } from "react";
import { Box, Text, Image, Flex, HStack, MenuItem } from "@chakra-ui/react";
import { getTokenDenoms, useTokenInfo } from "@arthuryeti/terra";

import { format, lookupSymbol } from "libs/parse";
import { Pair } from "types/common";
import { useAccountShare } from "modules/pool/hooks/useAccountShare";

interface Props {
  pair: Pair;
  onClick: (pair: Pair) => void;
}

const LpTokenItem: FC<Props> = (props) => {
  const { pair, onClick } = props;

  const accountShare = useAccountShare(pair.lpToken);

  const { getIcon, getSymbol } = useTokenInfo();

  const [token1, token2] = pair ? getTokenDenoms(pair.asset_infos) : [];

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
      onClick={() => onClick(pair)}
    >
      <Flex align="center" justify="space-between" py="2.5" w="full">
        <Box mr="2">
          <Flex align="center" justify="space-between">
            <Image
              src={getIcon(token1)}
              width="1rem"
              height="1rem"
              alt="Logo"
            />
            <Image src={getIcon(token2)} width="1rem" height="1em" alt="Logo" />
          </Flex>
        </Box>
        <Box flex="1">
          <Text fontSize="xl" fontWeight="500" lineHeight="normal">
            {lookupSymbol(getSymbol(token1))} -{" "}
            {lookupSymbol(getSymbol(token2))}
          </Text>
        </Box>
        <Box>
          <HStack>
            <Box>
              <Text fontSize="sm" color="brand.dark" opacity="0.4">
                Balance:
              </Text>
            </Box>
            <Box minW="24">
              <Text fontSize="sm" color="brand.dark" textAlign="right">
                {format(accountShare, "LP")}
              </Text>
            </Box>
          </HStack>
        </Box>
      </Flex>
    </MenuItem>
  );
};

export default LpTokenItem;
