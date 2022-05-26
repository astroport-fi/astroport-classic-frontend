import React, { FC } from "react";
import { Box, forwardRef } from "@chakra-ui/react";
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
  hidePrice?: boolean;
  isMobile?: boolean;
  isLoading?: boolean;
  hideMaxButton?: boolean;
  max?: number;
  price?: number | undefined;
};

const Field: FC<Props> = forwardRef(
  (
    {
      asset,
      onChange,
      onBlur,
      value,
      max,
      price,
      isLpToken,
      balance,
      balanceLabel,
      clampValueOnBlur,
      hideBalanceLabel = false,
      hideMaxButton = false,
      hidePrice = false,
      isMobile = false,
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
            onChange={(v: string | number) => onChange(v)}
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
          isMobile={isMobile}
          onChange={(v: string | number) => onChange(v)}
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
          hidePrice={hidePrice}
          isLpToken={!!isLpToken}
          isMobile={isMobile}
          price={price}
        />
        {!isMobile && renderBalance()}
      </Box>
    );
  }
);

export default Field;
