import React, { FC } from "react";
import { Box, Flex, Text, HStack, Image } from "@chakra-ui/react";
import { Denom } from "@terra-money/terra.js";

import { ESTIMATE_TOKEN } from "constants/constants";
import { useTokenPrice, useSimulation } from "modules/swap";
import { useTokenInfo } from "modules/terra";
import { lookupSymbol, format, toAmount } from "libs/parse";

type Props = {
  token: any;
};

const TokenCard: FC<Props> = ({ token }) => {
  const { getIcon, getSymbol } = useTokenInfo();
  const fromPrice = useTokenPrice(token.asset);
  const { amount: fromTotalPrice } = useSimulation(
    token.asset,
    ESTIMATE_TOKEN,
    toAmount(token.amount)
  );

  return (
    <Box
      borderWidth="1px"
      borderRadius="xl"
      borderColor="white.200"
      bg="white.50"
      px="4"
      py="4"
    >
      <Flex justify="space-between">
        <Box>
          <HStack spacing="4">
            <Box>
              <Image
                src={getIcon(token.asset)}
                width="2.5rem"
                height="2.5rem"
                alt="Logo"
              />
            </Box>
            <Box>
              <Text fontSize="2xl" color="white">
                {lookupSymbol(getSymbol(token.asset))}
              </Text>
              <Text fontSize="sm" color="white.400">
                Price: ${format(fromPrice, Denom.USD)}
              </Text>
            </Box>
          </HStack>
        </Box>
        <Box fontWeight="500" textAlign="right">
          <Text fontSize="2xl" color="white">
            {format(token.amount)}
          </Text>
          <Text fontSize="sm" color="white.400">
            Price: ${format(fromTotalPrice, Denom.USD)}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default TokenCard;
