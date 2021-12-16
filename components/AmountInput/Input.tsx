import React, { FC } from "react";
import { Box, Text, NumberInput, NumberInputField } from "@chakra-ui/react";
import { fromTerraAmount, toTerraAmount } from "@arthuryeti/terra";

import { ESTIMATE_TOKEN } from "constants/constants";
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
  const simulated = useSwapSimulate({
    token1: value.asset,
    token2: ESTIMATE_TOKEN,
    amount: toTerraAmount(value.amount),
    reverse: false,
  });

  const totalAmount =
    value.asset === ESTIMATE_TOKEN
      ? toTerraAmount(value.amount)
      : simulated?.amount;

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
            ${fromTerraAmount(totalAmount, "0,0.000")}
          </Text>
        </Box>
      </NumberInput>
    </Box>
  );
};

export default Input;
