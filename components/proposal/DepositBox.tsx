import React, { FC } from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import { handleBigAndTinyAmount } from "modules/common";
import ErrorBubble from "components/common/ErrorBubble";

type Props = {
  xAstroRequiredTokens?: number;
  xAstroBalanceTokens?: number;
  xAstroPrice?: number;
  balanceError: boolean;
};

const DepositBox: FC<Props> = ({
  xAstroRequiredTokens,
  xAstroBalanceTokens,
  xAstroPrice,
  balanceError,
}) => {
  return (
    <Box
      bg="brand.defaultTable"
      py={["2", "5"]}
      px={["4", "8"]}
      mb="5"
      borderWidth="none"
      borderRadius="xl"
      position="relative"
      color="white"
    >
      <Flex mb="2" mx="1" fontSize="sm" justify="space-between">
        <Text>Deposit:</Text>
        <Flex>
          <Text color="white.500">In Wallet:</Text>
          <Text ml="2">
            {handleBigAndTinyAmount(xAstroBalanceTokens)} xASTRO
          </Text>
        </Flex>
      </Flex>
      {xAstroRequiredTokens && (
        <Box
          bg="black.400"
          px="5"
          py="3"
          borderRadius="md"
          borderWidth={balanceError ? "1px" : "none"}
          borderColor={balanceError ? "errors.main" : "none"}
        >
          <Flex color="white.600" fontSize="md">
            {xAstroRequiredTokens} xASTRO
          </Flex>
          {xAstroPrice && (
            <Flex color="white.400" fontSize="sm">
              ${handleBigAndTinyAmount(xAstroPrice * xAstroRequiredTokens)}
            </Flex>
          )}
        </Box>
      )}
      {balanceError && (
        <ErrorBubble text="!" position="absolute" top="60px" right="48px" />
      )}
      {balanceError && (
        <Text mt="2" color="errors.main" fontSize="sm">
          Insufficient xASTRO to lock
        </Text>
      )}
    </Box>
  );
};

export default DepositBox;
