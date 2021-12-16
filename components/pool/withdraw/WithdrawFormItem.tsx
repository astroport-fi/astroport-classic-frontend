import React, { FC } from "react";
import { Box, Flex, BoxProps, Image, Text, HStack } from "@chakra-ui/react";

import { useTokenInfo } from "modules/common";
import { useTokenPriceInUst } from "modules/swap";
import { fromTerraAmount } from "@arthuryeti/terra";

type Props = {
  token: string;
  amount: string;
} & BoxProps;

const WithdrawFormItem: FC<Props> = ({ token, amount, ...props }) => {
  const { getIcon, getSymbol } = useTokenInfo();
  const price = useTokenPriceInUst(token);
  const totalPrice = String(Number(price) * Number(amount));

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
        <Text textStyle="medium">{fromTerraAmount(amount, "0,0.000")}</Text>
      </Flex>

      <Flex mt={2} justify="space-between">
        <Text textStyle="small" variant="dimmed">
          Price: ${fromTerraAmount(price, "0,0.000")}
        </Text>
        <Text textStyle="small" variant="dimmed">
          ${fromTerraAmount(totalPrice, "0,0.000")}
        </Text>
      </Flex>
    </Box>
  );
};

export default WithdrawFormItem;
