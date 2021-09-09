import React, { FC, useEffect } from "react";
import { Box, Flex, chakra, Text, HStack, IconButton } from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";

import { DEFAULT_SLIPPAGE } from "constants/constants";
import GearIcon from "components/icons/GearIcon";
import GraphIcon from "components/icons/GraphIcon";
import Card from "components/Card";
import ArrowIcon from "components/icons/ArrowIcon";
import AmountInput from "components/common/AmountInput";
import SwapFormFooter from "components/swap/SwapFormFooter";
import SwapFormConfirm from "components/swap/SwapFormConfirm";
import SwapFormSuccess from "components/swap/SwapFormSuccess";
import SwapFormError from "components/swap/SwapFormError";
import { useSwap, SwapStep } from "modules/swap";
import { formatAmount, useTerra } from "@arthuryeti/terra";
import { toAmount } from "libs/parse";
import { motion, useAnimation } from "framer-motion";
import useThrottle from "hooks/useThrottle";
import useDebounceValue from "hooks/useDebounceValue";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

type Props = {};

const SwapForm: FC<Props> = () => {
  const card1Control = useAnimation();
  const card2Control = useAnimation();

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

  const debouncedAmount1 = useDebounceValue(token1.amount, 1000);
  const debouncedAmount2 = useDebounceValue(token2.amount, 1000);

  const swapState = useSwap({
    token1: token1.asset,
    token2: token2.asset,
    amount1: toAmount(debouncedAmount1),
    amount2: toAmount(debouncedAmount2),
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

  const switchTokens = () => {
    if (swapState.isReverse) {
      card1Control.start({ scale: [1, 0.8, 0.8, 1], y: [162, 162, 0, 0] });
      card2Control.start({ scale: [1, 0.8, 0.8, 1], y: [-162, -162, 0, 0] });
    } else {
      card1Control.start({ scale: [1, 0.8, 0.8, 1], y: [0, 0, 162, 162] });
      card2Control.start({ scale: [1, 0.8, 0.8, 1], y: [0, 0, -162, -162] });
    }
    swapState.toggleIsReverse();
  };

  useEffect(() => {
    changeToken2Amount();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swapState.minimumReceive]);

  useEffect(() => {
    card1Control.start({ y: 0 });
    card2Control.start({ y: 0 });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            animate={card1Control}
          >
            <Controller
              name="token1"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <AmountInput {...field} />}
            />
          </MotionBox>

          <MotionFlex
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            justify="center"
            mt="-3.5"
            mb="-5"
            zIndex="3"
            position="relative"
          >
            <IconButton
              aria-label="Switch"
              icon={<ArrowIcon />}
              onClick={switchTokens}
              variant="icon"
              borderRadius="full"
              minWidth="8"
              h="8"
            />
          </MotionFlex>

          <MotionBox
            key="card2"
            mt="2"
            borderRadius="xl"
            bg="rgba(89,183,221,0.8)"
            py="8"
            px="12"
            initial={{ y: 30 }}
            animate={card2Control}
          >
            <Controller
              name="token2"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <AmountInput {...field} />}
            />
          </MotionBox>

          {swapState.error && (
            <Card mt="3">
              <Text variant="light">{swapState.error}</Text>
            </Card>
          )}

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
        <SwapFormConfirm from={token1} to={token2} swapState={swapState} />
      )}
      {swapState.step === SwapStep.Success && (
        <SwapFormSuccess from={token1} to={token2} swapState={swapState} />
      )}
      {swapState.step === SwapStep.Error && (
        <SwapFormError swapState={swapState} />
      )}
    </chakra.form>
  );
};

export default SwapForm;
