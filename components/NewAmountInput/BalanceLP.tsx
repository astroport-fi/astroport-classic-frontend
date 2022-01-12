import React, { FC } from "react";
import { Box, Text, Flex, Button, HStack } from "@chakra-ui/react";
import { useBalance, num } from "@arthuryeti/terra";

import { ONE_TOKEN } from "constants/constants";
import numeral from "numeral";

type Props = {
  asset: string;
  initial?: string;
  max?: string | number;
  label?: string;
  hideLabel?: boolean;
  hideButton?: boolean;
  isDisabled?: boolean;
  onChange: (value: string | number) => void;
};

const BalanceLP: FC<Props> = ({
  asset,
  initial,
  max,
  label = "In Wallet",
  hideLabel = false,
  hideButton = false,
  isDisabled = false,
  onChange,
}) => {
  const balance = useBalance(asset);
  const amount = num(initial ?? balance)
    .div(ONE_TOKEN)
    .dp(6)
    .toNumber();

  const renderButton = () => {
    if (!hideButton) {
      return (
        <Button
          variant="mini"
          type="button"
          onClick={() => onChange(max ?? amount)}
          isDisabled={isDisabled}
        >
          Max
        </Button>
      );
    }
  };

  return (
    <Flex align="center" justify="space-between" mt="1">
      {!hideLabel && (
        <Box>
          <HStack spacing="4">
            <Text fontSize="sm" fontWeight="500" color="white.400" maxW="24">
              {label}:
            </Text>{" "}
            <Text fontSize="sm" color="white" ml="2">
              {numeral(amount).format("0,0.000000")}
            </Text>
          </HStack>
        </Box>
      )}
      <Box>{renderButton()}</Box>
    </Flex>
  );
};

export default BalanceLP;
