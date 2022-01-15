import React, { FC } from "react";
import { Flex, Image, Text, Box, HStack } from "@chakra-ui/react";
import numeral from "numeral";

import { useTokenInfo } from "modules/common";
import { useTokenPriceInUstWithSimulate } from "modules/swap";

type Props = {
  token: string;
  desc: string;
  amount: number | string;
};

const RewardLineItem: FC<Props> = ({ token, amount, desc }) => {
  const { getIcon, getSymbol } = useTokenInfo();
  const price = useTokenPriceInUstWithSimulate(token);
  const balance = numeral(amount).format("0,0.000[000]");

  return (
    <Flex mt={2} justify="space-between">
      <Flex align="center" justify="space-between" w="full">
        <Box mr="4">
          <Image src={getIcon(token)} alt={getSymbol(token)} boxSize="10" />
        </Box>
        <Box flex="1">
          <Text fontSize="xl" fontWeight="500" lineHeight="normal">
            {getSymbol(token)}
          </Text>
          <Text fontSize="sm" opacity="0.4">
            {desc}
          </Text>
        </Box>
        <Box>
          <Box minW="24">
            <Text fontSize="sm" textAlign="right" fontWeight="500">
              {balance}
            </Text>
            <Text fontSize="sm" textAlign="right" variant="dimmed">
              ${price}
            </Text>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default RewardLineItem;
