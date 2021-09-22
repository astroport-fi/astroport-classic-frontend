import React, { FC } from "react";
import { Box, Flex, BoxProps, Text, HStack } from "@chakra-ui/react";
import { useTokenInfo } from "@arthuryeti/terra";

import { format } from "libs/parse";
import { useTokenPrice } from "modules/swap";

type Props = {
  token: string;
  amount: string;
} & BoxProps;

const WithdrawFormItem: FC<Props> = ({ token, amount, ...props }) => {
  const { getSymbol } = useTokenInfo();
  const price = useTokenPrice(token);
  const totalPrice = String(Number(price) * Number(amount));

  return (
    <Flex
      justify="space-between"
      borderBottomWidth="1px"
      borderBottomColor="white.300"
      pb="4"
      {...props}
    >
      <Box>
        <HStack>
          <Text>{getSymbol(token)}</Text>
        </HStack>
        <Box>
          <Text variant="light">Price: ${format(totalPrice, "uusd")}</Text>
        </Box>
      </Box>
      <Box textAlign="right">
        <Text>{format(amount)}</Text>
        <Text variant="light">Price: ${format(price, "uusd")}</Text>
      </Box>
    </Flex>
  );
};

export default WithdrawFormItem;
