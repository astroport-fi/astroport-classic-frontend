import React, { FC } from "react";
import { Box, Flex, Text, HStack, Image } from "@chakra-ui/react";
import { fromTerraAmount, num, toTerraAmount } from "@arthuryeti/terra";

import { useTokenInfo } from "modules/common";
import { useTokenPriceInUst } from "modules/swap";
import numeral from "numeral";

type Props = {
  token: any;
};

const TokenCard: FC<Props> = ({ token }) => {
  const { getIcon, getSymbol } = useTokenInfo();
  const price = useTokenPriceInUst(token.asset);
  const totalInUst = num(token.amount).times(price).toFixed(6);

  const totalAmount = toTerraAmount(totalInUst);
  const formattedAmount = numeral(token.amount).format("0,0.[000]");

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
                Price: ${price}
              </Text>
            </Box>
          </HStack>
        </Box>
        <Box fontWeight="500" textAlign="right">
          <Text textStyle="h3">{formattedAmount}</Text>
          <Text textStyle="small" variant="dimmed">
            ${fromTerraAmount(totalAmount, "0.00")}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default TokenCard;
