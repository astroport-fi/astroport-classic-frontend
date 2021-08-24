import React, { FC, useMemo } from "react";
import { Box, Flex, Text, HStack, IconButton } from "@chakra-ui/react";

import SuccessIcon from "components/icons/SuccessIcon";
import CloseIcon from "components/icons/CloseIcon";
import Card from "components/Card";
import TokenCard from "components/swap/TokenCard";
import { swapRouteToString, SwapStep } from "modules/swap";
import { useTokenInfo } from "modules/terra";
import { lookupSymbol, format } from "libs/parse";
import { useTerra } from "contexts/TerraContext";
import { motion } from "framer-motion";

type Props = {
  swapState: any;
  from: any;
  to: any;
};

const MotionBox = motion(Box);

const SwapFormSuccess: FC<Props> = ({ from, to, swapState }) => {
  const { getSymbol } = useTokenInfo();
  const { exchangeRate, swapRoute } = swapState;
  const { tokens } = useTerra();

  const swapRouteString = useMemo(() => {
    if (!(swapRoute && tokens)) {
      return null;
    }

    return swapRouteToString(from.asset, swapRoute, tokens);
  }, [swapRoute, from, tokens]);

  return (
    <MotionBox initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }}>
      <Card>
        <Flex justify="space-between" align="center" mb="6">
          <HStack>
            <SuccessIcon />
            <Text fontSize="2xl" color="green.500">
              Successful
            </Text>
          </HStack>
          <IconButton
            aria-label="Close"
            icon={<CloseIcon />}
            variant="icon"
            onClick={() => swapState.setStep(SwapStep.Initial)}
          />
        </Flex>

        <Text mb="1" px="2" variant="light">
          You are swapping from:
        </Text>
        <TokenCard token={from} />
        <Text mt="6" mb="1" px="2" variant="light">
          You are swapping to:
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
              Price Impact
            </Text>
            <Text color="green.500">0.002%</Text>
          </HStack>
          {/* <HStack justify="space-between" mb="1">
          <Text fontSize="sm" color="white.600">
            Liquidity Provider Fee
          </Text>
          <Text>{feeString}</Text>
        </HStack> */}
          <HStack justify="space-between" mb="1">
            <Text fontSize="sm" color="white.600">
              Route
            </Text>
            <Text>{swapRouteString}</Text>
          </HStack>
          <HStack justify="space-between">
            <Text fontSize="sm" color="white.600">
              Exchange Rate
            </Text>
            <Text>
              1 {lookupSymbol(getSymbol(from.asset))} ={" "}
              {format(exchangeRate, to.asset)}{" "}
              {lookupSymbol(getSymbol(to.asset))}
            </Text>
          </HStack>
        </Box>
      </Card>
    </MotionBox>
  );
};

export default SwapFormSuccess;
