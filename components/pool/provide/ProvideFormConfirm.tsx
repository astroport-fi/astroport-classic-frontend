import React, { FC, useMemo } from "react";
import { Box, Flex, Text, HStack, IconButton, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";

import CloseIcon from "components/icons/CloseIcon";
import Card from "components/Card";
import TokenCard from "components/swap/TokenCard";
import SwapFormFee from "components/swap/SwapFormFee";
import { ProvideStep, ProvideState } from "modules/pool";

type Props = {
  state: ProvideState;
  from: {
    asset: string;
    amount: string;
  };
  to: {
    asset: string;
    amount: string;
  };
};

const MotionBox = motion(Box);

const ProvideFormConfirm: FC<Props> = ({ from, to, state }) => {
  const { fee } = state;

  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Card>
        <Flex justify="space-between" align="center" mb="6">
          <Text fontSize="2xl">Confirm</Text>
          <IconButton
            aria-label="Close"
            icon={<CloseIcon />}
            variant="icon"
            onClick={() => state.setStep(ProvideStep.Initial)}
          />
        </Flex>

        <Text mb="1" px="2" variant="light">
          You are providing
        </Text>
        <TokenCard token={from} />
        <Text mt="6" mb="1" px="2" variant="light">
          and:
        </Text>
        <TokenCard token={to} />
        <Text mt="6" mb="1" px="2" variant="light">
          Further Information:
        </Text>
        <Box
          borderWidth="1px"
          borderRadius="xl"
          borderColor="white.200"
          bg="white.100"
          px="4"
          py="4"
        >
          <HStack justify="space-between" mb="1">
            <Text fontSize="sm" color="white.600">
              Rates
            </Text>
            <Text color="green.500">0.002%</Text>
          </HStack>
          <HStack justify="space-between" mb="1">
            <Text fontSize="sm" color="white.600">
              APY
            </Text>
            <Text color="green.500">0.002%</Text>
          </HStack>
          <HStack justify="space-between" mb="1">
            <Text fontSize="sm" color="white.600">
              Share of Pool
            </Text>
            <Text color="green.500">0.002%</Text>
          </HStack>
        </Box>

        {state.step === ProvideStep.Confirm && (
          <>
            <Text variant="light" mt="3" px="2">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet.
            </Text>

            <Flex flexDir="column" align="center" mt="6">
              <Button variant="primary" type="submit">
                Confirm Swap
              </Button>
              <SwapFormFee fee={fee} />
            </Flex>
          </>
        )}
      </Card>
    </MotionBox>
  );
};

export default ProvideFormConfirm;
