import React, { FC } from "react";
import { Box, Flex, forwardRef } from "@chakra-ui/react";

import {
  Balance,
  Select,
  Single,
  Input,
  SingleLP,
  BalanceLP,
  SelectLP,
} from "components/AmountInput";

type Props = {
  tokens?: string[];
  balance?: string;
  balanceLabel?: string;
  isLpToken?: boolean;
  isSingle?: boolean;
  onBlur: any;
  onChange: any;
  hideLabel?: boolean;
  hideBalanceLabel?: boolean;
  isDisabled?: boolean;
  hideMaxButton?: boolean;
  value: {
    amount: string;
    asset: string;
  };
  limit?: number;
};

const Field: FC<Props> = forwardRef(
  (
    {
      onChange,
      onBlur,
      value,
      limit,
      isSingle,
      isLpToken,
      balance,
      balanceLabel,
      hideLabel = false,
      hideBalanceLabel = false,
      hideMaxButton = false,
      isDisabled = false,
      tokens,
    },
    ref
  ) => {
    const handleClick = (asset: string) => {
      onChange({ asset, amount: undefined });
    };

    const renderSingle = () => {
      if (isLpToken) {
        return (
          <Box pr="8">
            <SingleLP asset={value.asset} />
          </Box>
        );
      }

      return (
        <Box pr="8">
          <Single asset={value.asset} />
        </Box>
      );
    };

    const renderBalance = () => {
      if (isLpToken) {
        return (
          <BalanceLP
            asset={value.asset}
            initial={balance}
            label={balanceLabel}
            hideLabel={hideBalanceLabel}
            hideButton={hideMaxButton}
            isDisabled={isDisabled}
            onChange={(v: string) => onChange({ ...value, amount: v })}
          />
        );
      }

      return (
        <Balance
          asset={value.asset}
          initial={balance}
          label={balanceLabel}
          hideLabel={hideBalanceLabel}
          hideButton={hideMaxButton}
          isDisabled={isDisabled}
          onChange={(v: string) => onChange({ ...value, amount: v })}
        />
      );
    };

    const renderSelect = () => {
      if (isLpToken) {
        return <SelectLP value={value.asset} onClick={handleClick} />;
      }

      return (
        <Select value={value.asset} tokens={tokens} onClick={handleClick} />
      );
    };

    return (
      <Box ref={ref}>
        <Flex justify="space-between">
          {!hideLabel && (
            <Box flex="1">{isSingle ? renderSingle() : renderSelect()}</Box>
          )}
          <Box flex="1">
            <Input
              value={value}
              max={limit}
              onChange={(amount: string) => onChange({ ...value, amount })}
              onBlur={onBlur}
              isDisabled={isDisabled}
            />
            {renderBalance()}
          </Box>
        </Flex>
      </Box>
    );
  }
);

export default Field;
