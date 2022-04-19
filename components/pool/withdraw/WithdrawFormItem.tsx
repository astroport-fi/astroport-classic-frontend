import React, { FC } from "react";
import { Box, Flex, BoxProps, Image, Text, HStack } from "@chakra-ui/react";
import {
  useTokenInfo,
  handleTinyAmount,
  usePriceDerived,
} from "modules/common";
import { useTokenPriceInUstWithSimulate } from "modules/swap";

type Props = {
  token: string;
  amount: string;
  poolType: string | null;
} & BoxProps;

const WithdrawFormItem: FC<Props> = ({ token, amount, poolType, ...props }) => {
  const { getIcon, getSymbol } = useTokenInfo();

  const swapSimulationPrice = useTokenPriceInUstWithSimulate(token).toFixed(2);
  const poolRatioPrice = usePriceDerived(token).toFixed(2);
  const price = poolType === "xyk" ? poolRatioPrice : swapSimulationPrice;

  const totalPrice = +price * +amount;
  const formatted = handleTinyAmount(amount);
  const formattedPrice = handleTinyAmount(price);
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
          Price: ${formattedPrice}
        </Text>
        <Text textStyle="small" variant="dimmed">
          ${formattedTotal}
        </Text>
      </Flex>
    </Box>
  );
};

export default WithdrawFormItem;
