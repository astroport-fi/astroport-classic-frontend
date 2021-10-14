import React, { FC } from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";
import { useBalance, fromTerraAmount } from "@arthuryeti/terra";

import Card from "components/Card";
import { Input } from "components/AmountInput";

const UnstakeAstroFormInput: FC = () => {
  const { control, watch } = useFormContext();
  const token = watch("token");
  const balance = useBalance(token.asset);

  return (
    <Card py="12" px="12">
      <Flex align="center" justify="space-between">
        <Box>
          <Text fontSize="xl" fontWeight="500">
            {fromTerraAmount(balance, "0,0.00")}
          </Text>
          <Text color="white.400" fontSize="xs">
            Total xAstro able to unstake
          </Text>
        </Box>

        <Controller
          name="token"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={(amount: string) =>
                field.onChange({ ...field.value, amount })
              }
              onBlur={field.onBlur}
            />
          )}
        />
      </Flex>
    </Card>
  );
};

export default UnstakeAstroFormInput;
