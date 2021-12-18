import React, { FC } from "react";
import { Box, Flex, Button, Text } from "@chakra-ui/react";

import { useTokenInfo } from "modules/common";
import { usePriceImpact } from "modules/swap";
import FormFee from "components/common/FormFee";
import numeral from "numeral";
import { num } from "@arthuryeti/terra";

type Props = {
  from: string;
  to: string;
  fee: any;
  price: string;
  isLoading: boolean;
  isDisabled: boolean;
  onConfirmClick: () => void;
};

const SwapFormFooter: FC<Props> = ({
  from,
  to,
  price,
  isLoading,
  isDisabled,
  fee,
  onConfirmClick,
}) => {
  const { getSymbol } = useTokenInfo();
  const priceImpact = usePriceImpact({ from, to, price });
  const formattedPrice = numeral(price).format("0,0.00[0]").toString();

  return (
    <Flex justify="space-between" px="12" mt="8">
      <Box flex="1" color="white">
        {!isDisabled && (
          <>
            <Text textStyle="medium">
              1 {getSymbol(from)} = {formattedPrice} {getSymbol(to)}
            </Text>
            <Text textStyle="small" variant="dimmed">
              Exchange Rate
            </Text>
          </>
        )}
      </Box>
      <Flex flex="1" align="center" flexDirection="column">
        <Button
          variant="primary"
          type="button"
          onClick={onConfirmClick}
          isLoading={isLoading}
          isDisabled={isDisabled}
        >
          Swap Tokens
        </Button>
        <Box color="white">{!isDisabled && <FormFee fee={fee} />}</Box>
      </Flex>
      <Box flex="1" textAlign="right" color="white">
        {!isDisabled && (
          <>
            <Text textStyle="medium" color="green.500">
              {priceImpact}%
            </Text>
            <Text textStyle="small" variant="dimmed">
              Price Impact
            </Text>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default SwapFormFooter;
