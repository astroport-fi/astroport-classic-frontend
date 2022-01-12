import React, { FC } from "react";
import { Box, Flex, BoxProps, Image, Text, HStack } from "@chakra-ui/react";

import { useTokenInfo, handleTinyAmount } from "modules/common";
import { useTokenPriceInUstWithSimulate } from "modules/swap";

type Props = {
  token: string;
  amount: string;
} & BoxProps;

const WithdrawFormItem: FC<Props> = ({ token, amount, ...props }) => {
  const { getIcon, getSymbol } = useTokenInfo();
  const price = useTokenPriceInUstWithSimulate(token);
  const totalPrice = +price * +amount;
  const formatted = handleTinyAmount(amount);
  const formattedTotal = handleTinyAmount(totalPrice);

  return (
    <Box
      justify="space-between"
      borderBottomWidth="1px"
      borderBottomColor="white.300"
      pb="4"
      {...props}
    >
      <Flex justify="space-between">
        <HStack>
          <Image src={getIcon(token)} alt={getSymbol(token)} boxSize={3} />
          <Text textStyle="medium">{getSymbol(token)}</Text>
        </HStack>
        <Text textStyle="medium">{formatted}</Text>
      </Flex>

      <Flex mt={2} justify="space-between">
        <Text textStyle="small" variant="dimmed">
          Price: ${price}
        </Text>
        <Text textStyle="small" variant="dimmed">
          ${formattedTotal}
        </Text>
      </Flex>
    </Box>
  );
};

export default WithdrawFormItem;
