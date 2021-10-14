import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

import Card from "components/Card";
import AmountInput from "components/AmountInput";

const StakeAstroFormInput: FC = () => {
  const { control } = useFormContext();

  return (
    <Card py="10">
      <Controller
        name="token"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <AmountInput {...field} isSingle />}
      />
    </Card>
  );
};

export default StakeAstroFormInput;
