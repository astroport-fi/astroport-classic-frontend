import React, { FC } from "react";
import { chakra, Flex, Text, Box, VStack } from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";
import { useBalance, fromTerraAmount, num } from "@arthuryeti/terra";
import { ONE_TOKEN } from "constants/constants";

import Card from "components/Card";
import { Input } from "components/AmountInput";

const UnstakeAstroFormInput: FC = () => {
  const { control, watch } = useFormContext();
  const token = watch("token");
  const balance = useBalance(token.asset);
  const max = num(balance).div(ONE_TOKEN).toNumber();

  return (
    <Card py="12">
      <Flex align="center" justify="space-between">
        <Box>
          <Text textStyle="h3">{fromTerraAmount(balance, "0,0.00")}</Text>
          <Text textStyle="small" variant="dimmed">
            Total xAstro able to unstake
          </Text>
        </Box>

        <Controller
          name="token"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <VStack spacing={2} align="end">
              <Input
                value={field.value}
                onChange={(amount: string) =>
                  field.onChange({ ...field.value, amount })
                }
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
                onClick={() => field.onChange({ ...field.value, amount: max })}
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

export default UnstakeAstroFormInput;
