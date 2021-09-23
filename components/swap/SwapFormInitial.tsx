import React, { FC, useEffect } from "react";
import { Box, Flex, chakra, Text, HStack, IconButton } from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { isValidAmount } from "@arthuryeti/terra";
import numeral from "numeral";
import { motion, useAnimation } from "framer-motion";

import { ONE_TOKEN } from "constants/constants";
import { SwapStep, SwapState } from "modules/swap";

import GearIcon from "components/icons/GearIcon";
import GraphIcon from "components/icons/GraphIcon";
import Card from "components/Card";
import ArrowIcon from "components/icons/ArrowIcon";
import AmountInput from "components/AmountInput";
import SwapFormFooter from "components/swap/SwapFormFooter";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

type Props = {
  token1: {
    asset: string;
    amount: string;
  };
  token2: {
    asset: string;
    amount: string;
  };
  swapState: SwapState;
};

const SwapForm: FC<Props> = ({ token1, token2, swapState }) => {
  const { control, formState, handleSubmit, setValue } = useFormContext();
  const card1Control = useAnimation();
  const card2Control = useAnimation();

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
    // @ts-expect-error
    if (formState.name == "token1" && isValidAmount(token1.amount)) {
      const rate = numeral(swapState.exchangeRate).divide(ONE_TOKEN).value();

      setValue("token2.amount", numeral(token1.amount).multiply(rate).value());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token1.amount]);

  useEffect(() => {
    // @ts-expect-error
    if (formState.name == "token2" && isValidAmount(token2.amount)) {
      const rate = numeral(swapState.exchangeRate).divide(ONE_TOKEN).value();
      // @ts-expect-error
      const newAmount = numeral(token2.amount).divide(rate).value().toFixed(6);

      setValue("token1.amount", newAmount);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token2.amount]);

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
              <IconButton
                aria-label="Graph"
                icon={<GraphIcon />}
                variant="icon"
              />
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
    </chakra.form>
  );
};

export default SwapForm;
