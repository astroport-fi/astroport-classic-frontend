import React, { FC } from "react";
import { chakra, Flex, Text, Box, VStack } from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";
import { useBalance, fromTerraAmount, num } from "@arthuryeti/terra";
import { ONE_TOKEN } from "constants/constants";

import Card from "components/Card";
import { Input } from "components/NewAmountInput";

const GovUnstakeFormInput: FC = () => {
  const { control, watch } = useFormContext();
  const { token } = watch();
  const balance = useBalance(token);
  const max = num(balance).div(ONE_TOKEN).toNumber();

  return (
    <Card py="12">
      <Flex align="center" justify="space-between">
        <Box mb="8">
          <Text textStyle="h3">{fromTerraAmount(balance, "0,0.00")}</Text>
          <Text textStyle="small" variant="dimmed">
            Total xAstro able to unstake
          </Text>
        </Box>

        <Controller
          name="amount"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <VStack spacing={2} align="end">
              <Input
                asset={token}
                value={field.value}
                onChange={(amount: string) => field.onChange(amount)}
                onBlur={field.onBlur}
              />
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
                onClick={() => field.onChange(max)}
              >
                Max
              </chakra.button>
            </VStack>
          )}
        />
      </Flex>
    </Card>
  );
};

export default GovUnstakeFormInput;
