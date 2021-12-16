import React, { FC } from "react";
import { Box, Flex, Text, HStack, Image } from "@chakra-ui/react";
import { fromTerraAmount, toTerraAmount } from "@arthuryeti/terra";

import { ESTIMATE_TOKEN } from "constants/constants";
import { useTokenInfo } from "modules/common";
import { useTokenPriceInUst, useSwapSimulate } from "modules/swap";

type Props = {
  token: any;
};

const TokenCard: FC<Props> = ({ token }) => {
  const { getIcon, getSymbol } = useTokenInfo();
  const fromPrice = useTokenPriceInUst(token.asset);
  const simulated = useSwapSimulate({
    token1: token.asset,
    token2: ESTIMATE_TOKEN,
    amount: toTerraAmount(token.amount),
    reverse: false,
  });
  const totalAmount =
    token.asset === ESTIMATE_TOKEN
      ? toTerraAmount(token.amount)
      : simulated?.amount;

  return (
    <Box
      borderWidth="1px"
      borderRadius="xl"
      borderColor="white.200"
      bg="white.100"
      px="4"
      py="3"
      lineHeight="1.3"
    >
      <Flex justify="space-between">
        <Box>
          <HStack spacing="4">
            <Box>
              <Image src={getIcon(token.asset)} w={8} h={8} alt="Logo" />
            </Box>
            <Box>
              <Text textStyle="h3">{getSymbol(token.asset)}</Text>
              <Text textStyle="small" variant="dimmed">
                {/* TODO: Fix type */}
                Price: ${fromTerraAmount(fromPrice, "0.00")}
              </Text>
            </Box>
          </HStack>
        </Box>
        <Box fontWeight="500" textAlign="right">
          <Text textStyle="h3">{token.amount}</Text>
          <Text textStyle="small" variant="dimmed">
            ${fromTerraAmount(totalAmount, "0.00")}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default TokenCard;
