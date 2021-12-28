import React, { FC } from "react";
import { Box, Flex, forwardRef } from "@chakra-ui/react";

import { Balance, Input, BalanceLP } from "components/NewAmountInput";

type Props = {
  value: string;
  asset: string;
  onBlur: any;
  onChange: any;
  hideLabel?: boolean;
  hideBalanceLabel?: boolean;
  balance?: string;
  balanceLabel?: string;
  isLpToken?: boolean;
  isSingle?: boolean;
  clampValueOnBlur?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  hideMaxButton?: boolean;
  max?: number;
};

const Field: FC<Props> = forwardRef(
  (
    {
      asset,
      onChange,
      onBlur,
      value,
      max,
      isLpToken,
      balance,
      balanceLabel,
      clampValueOnBlur,
      hideBalanceLabel = false,
      hideMaxButton = false,
      isDisabled = false,
      isLoading = false,
    },
    ref
  ) => {
    const renderBalance = () => {
      if (isLpToken) {
        return (
          <BalanceLP
            asset={asset}
            max={max}
            initial={balance}
            label={balanceLabel}
            hideLabel={hideBalanceLabel}
            hideButton={hideMaxButton}
            isDisabled={isDisabled}
            onChange={(v: string) => onChange(v)}
          />
        );
      }

      return (
        <Balance
          asset={asset}
          max={max}
          initial={balance}
          label={balanceLabel}
          hideLabel={hideBalanceLabel}
          hideButton={hideMaxButton}
          isDisabled={isDisabled}
          onChange={(v: string) => onChange(v)}
        />
      );
    };

    return (
      <Box ref={ref}>
        <Input
          asset={asset}
          value={value}
          max={max}
          clampValueOnBlur={clampValueOnBlur}
          onChange={(v: string) => onChange(v)}
          onBlur={onBlur}
          isDisabled={isDisabled}
          isLoading={isLoading}
        />
        {renderBalance()}
      </Box>
    );
  }
);

export default Field;
