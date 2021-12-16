import React, { FC } from "react";
import { Box, Text, Flex, Button, HStack } from "@chakra-ui/react";
import { fromTerraAmount, useBalance } from "@arthuryeti/terra";

type Props = {
  asset: string;
  initial?: string;
  label?: string;
  hideLabel?: boolean;
  hideButton?: boolean;
  isDisabled?: boolean;
  onChange: (value: string) => void;
};

const BalanceLP: FC<Props> = ({
  asset,
  label = "In Wallet",
  initial,
  hideLabel = false,
  hideButton = false,
  isDisabled = false,
  onChange,
}) => {
  const balance = useBalance(asset);
  const amount = fromTerraAmount(initial ?? balance, "0.0[00000]");

  const renderButton = () => {
    if (!hideButton) {
      return (
        <Button
          variant="mini"
          type="button"
          onClick={() => onChange(amount)}
          isDisabled={isDisabled}
        >
          Max
        </Button>
      );
    }
  };

  return (
    <Flex align="center" justify="space-between" mt="1">
      <Box>
        <HStack spacing="4">
          <Text fontSize="sm" fontWeight="500" color="white.400" maxW="24">
            {label}:
          </Text>{" "}
          <Text fontSize="sm" color="white" ml="2">
            {fromTerraAmount(initial ?? balance, "0,0.00")}
          </Text>
        </HStack>
      </Box>
      <Box>{renderButton()}</Box>
    </Flex>
  );
};

export default BalanceLP;
