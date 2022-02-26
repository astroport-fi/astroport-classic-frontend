import React, { FC } from "react";
import {
  Box,
  NumberInput,
  NumberInputField,
  InputLeftElement,
  Spinner,
} from "@chakra-ui/react";

import { Price, PriceLP } from "components/NewAmountInput";

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
  isLpToken?: boolean;
  price?: number;
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
  isLpToken = false,
  price,
}) => {
  const renderPrice = () => {
    if (hidePrice) {
      return null;
    }

    if (isLpToken) {
      return <PriceLP token={asset} amount={value} />;
    }

    return <Price token={asset} amount={value} priceToken={price} />;
  };

  const sanitizeAmount = (e) => {
    const valueSplitted = String(value).split("");
    if (
      ["e", "E", "+", "-"].includes(e.key) ||
      (["."].includes(e.key) && valueSplitted.includes("."))
    ) {
      e.preventDefault();
    }
  };

  return (
    <Box>
      <NumberInput
        variant="brand"
        size="lg"
        value={value}
        min={0}
        max={max}
        precision={6}
        onChange={onChange}
        onBlur={onBlur}
        onKeyPress={sanitizeAmount}
        clampValueOnBlur={clampValueOnBlur}
        isDisabled={isDisabled}
      >
        <NumberInputField placeholder="0.0" pt={hidePrice ? 4 : 0} />
        {renderPrice()}
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
