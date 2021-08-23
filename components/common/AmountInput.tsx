import React, { FC } from "react";
import { Denom } from "@terra-money/terra.js";
import {
  Box,
  Text,
  NumberInput,
  NumberInputField,
  Flex,
  forwardRef,
  chakra,
} from "@chakra-ui/react";

import { lookup, formatAsset, format, toAmount } from "libs/parse";
import TokenSelect from "components/swap/TokenSelect";
import OneToken from "components/common/OneToken";
import { useSimulation } from "modules/swap";
import { useTokenInfo, useBalance } from "modules/terra";
import { ESTIMATE_TOKEN } from "constants/constants";

type Props = {
  onChange: any;
  onBlur: any;
  isLoading: boolean;
  isSingle?: boolean;
  tokens?: string[];
  value: {
    amount: string;
    asset: string;
  };
};

const AmountInput: FC<Props> = forwardRef(
  ({ onChange, onBlur, value, isLoading, isSingle, tokens }, ref) => {
    const { getSymbol } = useTokenInfo();
    const { amount: totalPrice } = useSimulation(
      value.asset,
      ESTIMATE_TOKEN,
      toAmount(value.amount)
    );
    const balance = useBalance(value.asset);
    const amount = lookup(balance, value.asset);

    const handleTokenClick = ({ token }) => {
      onChange({ asset: token, amount: undefined });
    };

    return (
      <Box ref={ref}>
        <Flex justify="space-between">
          <Box flex="1">
            {isSingle ? (
              <Box pr="8">
                <OneToken token={value.asset} />
              </Box>
            ) : (
              <TokenSelect
                token={value.asset}
                onTokenClick={handleTokenClick}
                isLoading={isLoading}
                tokens={tokens}
              />
            )}
          </Box>
          <Box flex="1">
            <Box>
              <NumberInput
                variant="brand"
                size="lg"
                value={value.amount}
                isDisabled={isLoading}
                onChange={(amount) => onChange({ ...value, amount })}
                onBlur={onBlur}
              >
                <NumberInputField placeholder="0.0" />
                <Box position="absolute" bottom="2" right="4">
                  <Text fontSize="xs" color="white.400">
                    ${format(totalPrice, Denom.USD)}
                  </Text>
                </Box>
              </NumberInput>
            </Box>
            <Flex align="center" justify="space-between" mt="1">
              <Box>
                <Text>
                  <Text
                    as="span"
                    fontSize="sm"
                    fontWeight="500"
                    color="white.400"
                  >
                    In Wallet:
                  </Text>{" "}
                  <Text as="span" fontSize="sm" color="white" ml="2">
                    {formatAsset(balance, getSymbol(value.asset))}
                  </Text>
                </Text>
              </Box>
              <Box>
                <chakra.button
                  type="button"
                  outline="none"
                  color="white.600"
                  fontSize="xs"
                  textTransform="uppercase"
                  bg="white.100"
                  fontWeight="bold"
                  px="3"
                  borderRadius="md"
                  letterSpacing="widest"
                  onClick={() => onChange({ ...value, amount })}
                >
                  Max
                </chakra.button>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
    );
  }
);

export default AmountInput;
