import React, { FC } from "react";
import { Box, Flex, Text, HStack, Image } from "@chakra-ui/react";
import { num } from "@arthuryeti/terra";
import numeral from "numeral";

import { handleTinyAmount, useTokenInfo } from "modules/common";
import { useTokenPriceInUstWithSimulate } from "modules/swap";

type Props = {
  token: any;
};

const TokenCard: FC<Props> = ({ token }) => {
  const { getIcon, getSymbol } = useTokenInfo();
  const price = useTokenPriceInUstWithSimulate(token.asset).toFixed(6);
  const totalInUst = num(token.amount).times(price).toFixed(6);
  const tokenAmount = numeral(token.amount).format("0,0.[000000]");
  const totalAmount = handleTinyAmount(totalInUst, "0,0.00", false, " UST");

  return (
    <Box
      borderWidth="1px"
      borderRadius="xl"
      borderColor="white.200"
      bg="white.100"
      px={["2", "4"]}
      py="3"
      lineHeight="1.3"
    >
      <Flex justify="space-between">
        <Box>
          <HStack spacing={["2", "4"]}>
            <Box>
              <Image
                src={getIcon(token.asset)}
                w={["6", "8"]}
                h={["6", "8"]}
                alt="Logo"
              />
            </Box>
            <Box>
              <Text textStyle={["medium", "h3"]}>{getSymbol(token.asset)}</Text>
              <Text textStyle="small" variant="dimmed">
                Price: {price} UST
              </Text>
            </Box>
          </HStack>
        </Box>
        <Box fontWeight="500" textAlign="right">
          <Text textStyle={["medium", "h3"]}>{tokenAmount}</Text>
          <Text textStyle="small" variant="dimmed">
            {totalAmount}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default TokenCard;
