import React, { FC, useEffect } from "react";
import { Box, Flex, chakra, Text, HStack } from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";

import { DEFAULT_SLIPPAGE } from "constants/constants";
import GearIcon from "components/icons/GearIcon";
import GraphIcon from "components/icons/GraphIcon";
import AmountInput from "components/swap/AmountInput";
import SwapFormFooter from "components/swap/SwapFormFooter";
import { useSwap } from "modules/swap";
import { formatAmount } from "modules/terra";
import { toAmount } from "libs/parse";
import { useTerra } from "contexts/TerraContext";

type Props = {};

const SwapForm: FC<Props> = () => {
  const { isReady } = useTerra();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      token1: {
        amount: undefined,
        asset: "uusd",
      },
      token2: {
        amount: undefined,
        asset: "uluna",
      },
    },
  });
  const token1 = watch("token1");
  const token2 = watch("token2");
  const swapState = useSwap({
    token1: token1.asset,
    token2: token2.asset,
    amount1: toAmount(token1.amount),
    amount2: toAmount(token2.amount),
    slippage: String(DEFAULT_SLIPPAGE),
  });

  useEffect(() => {
    if (swapState.minimumReceive) {
      setValue("token2", {
        ...token2,
        amount: formatAmount(swapState.minimumReceive),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swapState.minimumReceive]);

  const submit = async (data) => {
    swapState.swap();
  };

  return (
    <chakra.form onSubmit={handleSubmit(submit)} width="full">
      <Flex justify="space-between" color="white" mb="4" px="6">
        <Box flex="1">
          <Text fontSize="xl">Swap</Text>
        </Box>
        <HStack>
          <Box>
            <GearIcon />
          </Box>
          <Box>
            <GraphIcon />
          </Box>
        </HStack>
      </Flex>

      <Box borderRadius="xl" bg="rgba(22,41,230,0.8)" py="8" px="12">
        <Controller
          name="token1"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <AmountInput {...field} isLoading={!isReady} />
          )}
        />
      </Box>

      <Box mt="2" borderRadius="xl" bg="rgba(89,183,221,0.8)" py="8" px="12">
        <Controller
          name="token2"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <AmountInput {...field} isLoading={!isReady} />
          )}
        />
      </Box>

      <SwapFormFooter
        from={token1.asset}
        to={token2.asset}
        isLoading={!swapState.isReady}
        exchangeRate={swapState.exchangeRate}
        fee={swapState.fee}
      />
    </chakra.form>
  );
};

export default SwapForm;
