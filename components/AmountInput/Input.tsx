import React, { FC } from "react";
import { Denom } from "@terra-money/terra.js";
import { Box, Text, NumberInput, NumberInputField } from "@chakra-ui/react";

import { ESTIMATE_TOKEN } from "constants/constants";
import { format, toAmount } from "libs/parse";
import { useSimulation } from "modules/swap";

type Props = {
  onChange: any;
  onBlur: any;
  value: {
    amount: string;
    asset: string;
  };
};

const Input: FC<Props> = ({ onChange, onBlur, value }) => {
  const { amount: totalPrice } = useSimulation(
    value.asset,
    ESTIMATE_TOKEN,
    toAmount(value.amount)
  );

  return (
    <Box>
      <NumberInput
        variant="brand"
        size="lg"
        value={value.amount}
        onChange={onChange}
        onBlur={onBlur}
      >
        <NumberInputField placeholder="0.0" />
        <Box position="absolute" bottom="2" right="4">
          <Text fontSize="xs" color="white.400">
            ${format(totalPrice, Denom.USD)}
          </Text>
        </Box>
      </NumberInput>
    </Box>
  );
};

export default Input;
