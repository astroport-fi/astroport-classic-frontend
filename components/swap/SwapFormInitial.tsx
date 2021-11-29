import React, { FC, useEffect } from "react";
import { Box, Flex, Text, HStack, IconButton } from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { motion, useAnimation } from "framer-motion";
import { TxStep, num } from "@arthuryeti/terra";

import { SwapState } from "modules/swap";

import GearIcon from "components/icons/GearIcon";
import GraphIcon from "components/icons/GraphIcon";
import Card from "components/Card";
import ArrowIcon from "components/icons/ArrowIcon";
import AmountInput from "components/AmountInput";
import SwapFormFooter from "components/swap/SwapFormFooter";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionHStack = motion(HStack);

type Props = {
  token1: {
    asset: string;
    amount: string;
  };
  token2: {
    asset: string;
    amount: string;
  };
  state: SwapState;
  onClick: () => void;
};

const SwapForm: FC<Props> = ({ token1, token2, state, onClick }) => {
  const { control, formState, setValue } = useFormContext();
  const card1Control = useAnimation();
  const card2Control = useAnimation();

  const reverse = () => {
    setValue("token1", token2);
    setValue("token2", token1);
  };

  useEffect(() => {
    if (
      // @ts-expect-error
      formState.name == "token1" &&
      token1.amount != null &&
      state.simulated != null
    ) {
      const newAmount = num(token1.amount)
        .div(state.simulated.price)
        .toFixed(6);

      setValue("token2.amount", newAmount);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token1.amount]);

  useEffect(() => {
    if (
      // @ts-expect-error
      formState.name == "token2" &&
      token2.amount != null &&
      state.simulated != null
    ) {
      const newAmount = num(token2.amount)
        .times(state.simulated.price)
        .toFixed(6);

      setValue("token1.amount", newAmount);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token2.amount]);

  useEffect(() => {
    card1Control.start({ y: 0 });
    card2Control.start({ y: 0 });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box mt="24">
      <Flex justify="space-between" align="center" color="white" mb="4" px="6">
        <MotionBox
          flex="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Text fontSize="xl">Swap</Text>
        </MotionBox>
        <MotionHStack
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          spacing="2"
        >
          <IconButton
            aria-label="Settings"
            icon={<GearIcon />}
            variant="icon"
            minW="0"
          />
          <IconButton
            aria-label="Graph"
            icon={<GraphIcon />}
            variant="icon"
            minW="0"
          />
        </MotionHStack>
      </Flex>

      <MotionBox
        key="card1"
        borderRadius="xl"
        bg="brand.purple"
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
          onClick={reverse}
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
        bg="brand.blue"
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

      {state.error && (
        <Card mt="3">
          <Text variant="light">{state.error}</Text>
        </Card>
      )}

      <SwapFormFooter
        from={token1.asset}
        to={token2.asset}
        isLoading={state.txStep == TxStep.Estimating}
        isDisabled={state.txStep != TxStep.Ready}
        price={state.simulated?.price2}
        fee={state.fee}
        onConfirmClick={onClick}
      />
    </Box>
  );
};

export default SwapForm;
