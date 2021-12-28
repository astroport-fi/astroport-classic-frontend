import React, { FC } from "react";
import { Box, Text, Flex, Button, HStack } from "@chakra-ui/react";
import { fromTerraAmount, num, useBalance } from "@arthuryeti/terra";

import { MaxButton } from "components/NewAmountInput";
import { useTokenInfo } from "modules/common";
import { ONE_TOKEN } from "constants/constants";

type Props = {
  asset: string;
  label?: string;
  max?: string | number;
  initial?: string;
  hideLabel?: boolean;
  hideButton?: boolean;
  isDisabled?: boolean;
  onChange: (value: string | number) => void;
};

const Balance: FC<Props> = ({
  asset,
  max,
  initial,
  label = "In Wallet",
  hideLabel = false,
  hideButton = false,
  isDisabled = false,
  onChange,
}) => {
  const { getDecimals } = useTokenInfo();
  const balance = useBalance(asset);
  const newBalance = num(balance)
    .div(10 ** getDecimals(asset))
    .times(ONE_TOKEN)
    .toFixed(0);
  const amount = fromTerraAmount(initial ?? newBalance, "0.00");

  const renderButton = () => {
    if (!hideButton) {
      return (
        <MaxButton
          asset={asset}
          max={max ?? amount}
          onChange={onChange}
          isDisabled={isDisabled}
        />
        // <Button
        //   variant="mini"
        //   type="button"
        //   onClick={() => onChange(max ?? amount)}
        //   isDisabled={isDisabled}
        // >
        //   Max
        // </Button>
      );
    }
  };

  return (
    <Flex align="center" justify="space-between" mt="1">
      <Box>
        <HStack spacing="4">
          {!hideLabel && (
            <Text fontSize="sm" fontWeight="500" color="white.400">
              {label}:
            </Text>
          )}{" "}
          <Text fontSize="sm" color="white" ml="2">
            {fromTerraAmount(initial ?? newBalance, "0,0.00")}
          </Text>
        </HStack>
      </Box>
      <Box>{renderButton()}</Box>
    </Flex>
  );
};

export default Balance;
