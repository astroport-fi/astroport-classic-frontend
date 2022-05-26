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
  max?: number | undefined;
  isDisabled?: boolean;
  isLoading?: boolean;
  clampValueOnBlur?: boolean | undefined;
  hidePrice?: boolean;
  isLpToken?: boolean;
  isMobile?: boolean;
  price?: number | undefined;
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
  isMobile = false,
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

  const sanitizeAmount = (e: any) => {
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
        max={max || Infinity}
        precision={6}
        onChange={onChange}
        onBlur={onBlur}
        onKeyPress={sanitizeAmount}
        clampValueOnBlur={clampValueOnBlur}
        isDisabled={!!isDisabled}
      >
        <NumberInputField
          data-lpignore="true"
          placeholder="0.0"
          pt={hidePrice ? 4 : 0}
          {...(isMobile && {
            borderRadius: "none",
            border: "none",
            fontSize: "md",
          })}
        />
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
