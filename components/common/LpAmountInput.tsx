import React, { FC, useMemo } from "react";
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

import { formatAsset, format } from "libs/parse";
import { ONE_TOKEN } from "constants/constants";
import { Pair } from 'types/common';
import LpTokenSelect from 'components/common/LpTokenSelect';
import { useAccountShare } from 'modules/pool/hooks/useAccountShare';
import { useLpTokenPrice } from 'modules/pool/hooks/useLpTokenPrice';

interface Value {
  pair: Pair | null
  amount: string;
}

interface Props {
  onChange: (value: Value) => void;
  onBlur: any;
  isLoading: boolean;
  pairs: any[] | Pair[];
  value: Value;
  isSingle?: boolean;
};

const LpAmountInput: FC<Props> = forwardRef((props, ref) => {
  const {
    onChange,
    onBlur,
    isLoading,
    pairs,
    value,
  } = props;

  const accountShare = useAccountShare(value.pair?.lpToken);
  const lpTokenPrice = useLpTokenPrice(
    value.pair,
    String(Number(value.amount) * ONE_TOKEN),
  );

  const handleTokenClick = (pair) => {
    onChange({ pair, amount: undefined });
  };

  return (
    <Box ref={ref}>
      <Flex justify="space-between">
        <Box flex="1">
          <LpTokenSelect
            pair={value.pair}
            onTokenClick={handleTokenClick}
            isLoading={isLoading}
            pairs={pairs}
          />
          <Box mt="1">
            <Text
              as="span"
              fontSize="sm"
              fontWeight="500"
              color="white.400"
            >
              Your LP Token
            </Text>
          </Box>
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
                  ${format(lpTokenPrice, Denom.USD)}
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
                  {formatAsset(accountShare, 'LP')}
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
                onClick={() => onChange({
                  ...value,
                  amount: String(Number(accountShare) / ONE_TOKEN),
                })}
              >
                Max
              </chakra.button>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
});

export default LpAmountInput;
