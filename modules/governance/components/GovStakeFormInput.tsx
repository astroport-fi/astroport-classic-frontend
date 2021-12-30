import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Flex, Box } from "@chakra-ui/react";

import Card from "components/Card";
import TokenInput from "components/TokenInput";
import NewAmountInput from "components/NewAmountInput";

const GovStakeFormInput: FC = () => {
  const { control, watch } = useFormContext();
  const token = watch("token");

  return (
    <Card py="10">
      <Flex>
        <Box flex="1" pr="8">
          <Controller
            name="token"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <TokenInput isSingle {...field} />}
          />
        </Box>
        <Box flex="1">
          <Controller
            name="amount"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <NewAmountInput asset={token} {...field} />}
          />
        </Box>
      </Flex>
    </Card>
  );
};

export default GovStakeFormInput;
