import React, { FC } from "react";
import { Box, Flex, forwardRef } from "@chakra-ui/react";

import { Balance, Input, BalanceLP } from "components/NewAmountInput";

type Props = {
  asset: string;
  onBlur: any;
  onChange: any;
  hideLabel?: boolean;
  hideBalanceLabel?: boolean;
  balance?: string;
  balanceLabel?: string;
  isLpToken?: boolean;
  isSingle?: boolean;
  isDisabled?: boolean;
  hideMaxButton?: boolean;
  value: string;
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
      hideBalanceLabel = false,
      hideMaxButton = false,
      isDisabled = false,
    },
    ref
  ) => {
    const renderBalance = () => {
      if (isLpToken) {
        return (
          <BalanceLP
            asset={asset}
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
          onChange={(v: string) => onChange(v)}
          onBlur={onBlur}
          isDisabled={isDisabled}
        />
        {renderBalance()}
      </Box>
    );
  }
);

export default Field;
