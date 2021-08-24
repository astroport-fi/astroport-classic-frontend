import React, { FC, useEffect, useState } from "react";
import { Box, Flex, chakra, Text, HStack, IconButton } from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";

import { DEFAULT_SLIPPAGE } from "constants/constants";
import GearIcon from "components/icons/GearIcon";
import GraphIcon from "components/icons/GraphIcon";
import AmountInput from "components/common/AmountInput";
import SwapFormFooter from "components/swap/SwapFormFooter";
import SwapFormConfirm from "components/swap/SwapFormConfirm";
import SwapFormSuccess from "components/swap/SwapFormSuccess";
import SwapFormError from "components/swap/SwapFormError";
import { useSwap, SwapStep } from "modules/swap";
import { formatAmount } from "modules/terra";
import { toAmount } from "libs/parse";
import { useTerra } from "contexts/TerraContext";
import { motion } from "framer-motion";
import useThrottle from "hooks/useThrottle";

const MotionBox = motion(Box);

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

  const changeToken2Amount = useThrottle(() => {
    if (!swapState.minimumReceive) {
      return;
    }

    setValue("token2", {
      ...token2,
      amount: formatAmount(swapState.minimumReceive),
    });
  }, 300);

  useEffect(() => {
    changeToken2Amount();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swapState.minimumReceive]);

  const submit = async () => {
    swapState.swap();
  };

  return (
    <chakra.form onSubmit={handleSubmit(submit)} width="full">
      {swapState.step === SwapStep.Initial && (
        <>
          <Flex justify="space-between" color="white" mb="4" px="6">
            <MotionBox
              flex="1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Text fontSize="xl">Swap</Text>
            </MotionBox>
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <HStack>
                <Box>
                  <IconButton
                    aria-label="Settings"
                    icon={<GearIcon />}
                    variant="icon"
                  />
                </Box>
                <Box>
                  <GraphIcon />
                </Box>
              </HStack>
            </MotionBox>
          </Flex>

          <MotionBox
            key="card1"
            borderRadius="xl"
            bg="rgba(22,41,230,0.8)"
            py="8"
            px="12"
            initial={{ y: -30 }}
            animate={{ y: 0 }}
          >
            <Controller
              name="token1"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <AmountInput {...field} isLoading={!isReady} />
              )}
            />
          </MotionBox>

          <MotionBox
            key="card2"
            mt="2"
            borderRadius="xl"
            bg="rgba(89,183,221,0.8)"
            py="8"
            px="12"
            initial={{ y: 30 }}
            animate={{ y: 0 }}
          >
            <Controller
              name="token2"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <AmountInput {...field} isLoading={!isReady} />
              )}
            />
          </MotionBox>

          <SwapFormFooter
            from={token1.asset}
            to={token2.asset}
            isLoading={!swapState.isReady}
            exchangeRate={swapState.exchangeRate}
            fee={swapState.fee}
            onConfirmClick={() => swapState.setStep(SwapStep.Confirm)}
          />
        </>
      )}

      {swapState.step === SwapStep.Confirm && (
        <SwapFormConfirm
          from={token1.asset}
          to={token2.asset}
          swapState={swapState}
        />
      )}
      {swapState.step === SwapStep.Success && (
        <SwapFormSuccess
          from={token1.asset}
          to={token2.asset}
          swapState={swapState}
        />
      )}
      {swapState.step === SwapStep.Error && (
        <SwapFormError swapState={swapState} />
      )}
    </chakra.form>
  );
};

export default SwapForm;
