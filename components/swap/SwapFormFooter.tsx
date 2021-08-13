import React, { FC } from "react";
import { Box, Flex, Button, Text } from "@chakra-ui/react";

import { format, lookupSymbol } from "libs/parse";
import SwapFormFee from "components/swap/SwapFormFee";
import { useTokenInfo } from "modules/terra";

type Props = {
  from: string;
  to: string;
  fee: any;
  exchangeRate: string;
  isLoading: boolean;
};

const SwapFormFooter: FC<Props> = ({
  from,
  to,
  exchangeRate,
  isLoading,
  fee,
}) => {
  const { getSymbol } = useTokenInfo();

  return (
    <Flex justify="space-between" px="12" mt="8">
      <Box flex="1">
        {!isLoading && (
          <>
            <Text color="white" fontSize="sm">
              1 {lookupSymbol(getSymbol(from))} = {format(exchangeRate, to)}{" "}
              {lookupSymbol(getSymbol(to))}
            </Text>
            <Text variant="light">Exchange Rate</Text>
          </>
        )}
      </Box>
      <Flex flex="1" align="center" flexDirection="column">
        <Button variant="primary" type="submit" isDisabled={isLoading}>
          Swap
        </Button>
        {!isLoading && <SwapFormFee fee={fee} />}
      </Flex>
      <Box flex="1" textAlign="right">
        {!isLoading && (
          <>
            <Text color="green.500" fontSize="sm">
              0.002%
            </Text>
            <Text variant="light">Price Impact</Text>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default SwapFormFooter;
