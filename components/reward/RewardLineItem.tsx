import React, { FC } from "react";
import { Flex, Image, Text, Box } from "@chakra-ui/react";
import numeral from "numeral";

import { useTokenInfo, handleDollarTinyAmount } from "modules/common";
import { useTokenPriceInUstWithSimulate } from "modules/swap";

type Props = {
  token: string;
  desc?: string;
  amount: number | string;
};

const RewardLineItem: FC<Props> = ({ token, amount, desc }) => {
  const { getProtocol, getIcon, getSymbol } = useTokenInfo();
  const price = useTokenPriceInUstWithSimulate(token);
  const balance = numeral(amount).format("0,0.00[0000]");
  const total = numeral(price).multiply(amount).format("0,0.00[0000]");

  return (
    <Flex mt={4} justify="space-between">
      <Flex align="center" justify="space-between" w="full">
        <Box mr="4">
          <Image src={getIcon(token)} alt={getSymbol(token)} boxSize="10" />
        </Box>
        <Box flex="1">
          <Text fontSize="xl" fontWeight="500" lineHeight="1">
            {getSymbol(token)}
          </Text>
          <Text fontSize="sm" opacity="0.4">
            {desc ?? getProtocol(token)}
          </Text>
        </Box>
        <Box>
          <Box minW="24">
            <Text fontSize="sm" textAlign="right" fontWeight="500">
              {balance}
            </Text>
            <Text fontSize="sm" textAlign="right" variant="dimmed">
              {handleDollarTinyAmount(total)}
            </Text>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default RewardLineItem;
