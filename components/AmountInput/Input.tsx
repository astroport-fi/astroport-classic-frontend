import React, { FC } from "react";
import { Box, Text, NumberInput, NumberInputField } from "@chakra-ui/react";

import { ESTIMATE_TOKEN } from "constants/constants";
import { format, toAmount } from "libs/parse";
import { useSwapSimulate } from "modules/swap";

type Props = {
  onChange: any;
  onBlur: any;
  value: {
    amount: string;
    asset: string;
  };
  min?: number;
  max?: number;
};

const Input: FC<Props> = ({ onChange, onBlur, value, min, max }) => {
  const simulate = useSwapSimulate({
    token1: value.asset,
    token2: ESTIMATE_TOKEN,
    amount: toAmount(value.amount),
    reverse: false,
  });

  return (
    <Box>
      <NumberInput
        variant="brand"
        size="lg"
        value={value.amount}
        min={min}
        max={max}
        onChange={onChange}
        onBlur={onBlur}
      >
        <NumberInputField placeholder="0.0" />
        <Box position="absolute" bottom="2" right="4" color="white">
          <Text textStyle="small" variant="dimmed">
            ${format(simulate?.amount, "uusd")}
          </Text>
        </Box>
      </NumberInput>
    </Box>
  );
};

export default Input;
