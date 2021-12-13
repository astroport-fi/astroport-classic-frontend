import React, { FC } from "react";
import { Box, Text, NumberInput, NumberInputField } from "@chakra-ui/react";

import { num } from "@arthuryeti/terra";
import { format } from "libs/parse";
import { useTokenPriceInUst } from "modules/swap";

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
  const price = num(useTokenPriceInUst(value.asset))
    .times(num(value.amount))
    .toString();

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
            ${format(price, "uusd")}
          </Text>
        </Box>
      </NumberInput>
    </Box>
  );
};

export default Input;
