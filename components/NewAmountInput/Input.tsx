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
