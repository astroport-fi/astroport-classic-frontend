import React, { FC, useMemo } from "react";
import { Box, Text, NumberInput, NumberInputField } from "@chakra-ui/react";
import { fromTerraAmount, num } from "@arthuryeti/terra";

import { useTokenPriceInUst } from "modules/swap";

type Props = {
  onChange: any;
  onBlur: any;
  asset: string;
  value: string;
  min?: number;
  max?: number;
  isDisabled?: boolean;
};

const Input: FC<Props> = ({
  asset,
  onChange,
  onBlur,
  value,
  min,
  max,
  isDisabled,
}) => {
  const price = useTokenPriceInUst(asset);

  const totalInUst = useMemo(() => {
    if (value == "" || num(value).eq(0)) {
      return 0;
    }

    return num(value).times(price).toFixed(2);
  }, [price, value]);

  return (
    <Box>
      <NumberInput
        variant="brand"
        size="lg"
        value={value}
        min={min}
        max={max}
        onChange={onChange}
        onBlur={onBlur}
        isDisabled={isDisabled}
      >
        <NumberInputField placeholder="0.0" />
        <Box position="absolute" bottom="2" right="4" color="white">
          <Text textStyle="small" variant="dimmed">
            ${totalInUst}
          </Text>
        </Box>
      </NumberInput>
    </Box>
  );
};

export default Input;
