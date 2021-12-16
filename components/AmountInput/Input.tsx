import React, { FC } from "react";
import { Box, Text, NumberInput, NumberInputField } from "@chakra-ui/react";
import { fromTerraAmount, num } from "@arthuryeti/terra";

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
  isDisabled?: boolean;
};

const Input: FC<Props> = ({
  onChange,
  onBlur,
  value,
  min,
  max,
  isDisabled,
}) => {
  const price = useTokenPriceInUst(value.asset);
  const totalInUst = num(value.amount).times(price).toFixed(6);

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
        isDisabled={isDisabled}
      >
        <NumberInputField placeholder="0.0" />
        <Box position="absolute" bottom="2" right="4" color="white">
          <Text textStyle="small" variant="dimmed">
            ${fromTerraAmount(totalInUst, "0,0.000")}
          </Text>
        </Box>
      </NumberInput>
    </Box>
  );
};

export default Input;
