import React, { FC, useMemo } from "react";
import {
  Box,
  Text,
  NumberInput,
  NumberInputField,
  InputLeftElement,
  Spinner,
} from "@chakra-ui/react";
import { num } from "@arthuryeti/terra";

import { useTokenPriceInUst } from "modules/swap";

type Props = {
  onChange: any;
  onBlur: any;
  asset: string;
  value: string;
  max?: number;
  isDisabled?: boolean;
  isLoading?: boolean;
  clampValueOnBlur?: boolean;
  hidePrice?: boolean;
};

const Input: FC<Props> = ({
  asset,
  onChange,
  onBlur,
  value,
  max,
  clampValueOnBlur = true,
  isLoading,
  isDisabled,
  hidePrice = false,
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
        min={0}
        max={max}
        precision={3}
        onChange={onChange}
        onBlur={onBlur}
        clampValueOnBlur={clampValueOnBlur}
        isDisabled={isDisabled}
        isLoading={isLoading}
      >
        <NumberInputField placeholder="0.0" pt={hidePrice && 4} />
        {!hidePrice && (
          <Box position="absolute" bottom="2" right="4" color="white">
            <Text textStyle="small" variant="dimmed">
              ${totalInUst}
            </Text>
          </Box>
        )}
        {isLoading && (
          <InputLeftElement>
            <Spinner size="xs" color="white.500" />
          </InputLeftElement>
        )}
      </NumberInput>
    </Box>
  );
};

export default Input;
