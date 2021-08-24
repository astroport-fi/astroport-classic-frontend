import React, { FC, useEffect } from "react";
import {
  Box,
  Flex,
  chakra,
  Text,
  HStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";

import Card from "components/Card";
import AmountInput from "components/common/AmountInput";
import { toAmount, lookup } from "libs/parse";
import { useTerra } from "contexts/TerraContext";
import { useBalance } from "modules/terra";
import { useProvideSingle } from "modules/pool";
import ProvideFormFooter from "components/pool/provide/ProvideFormFooter";

type Props = {
  pair: any;
  pool: any;
  initialValues: {
    token: string;
  };
  tokens: string[];
};

const ProvideSingleForm: FC<Props> = ({
  pair,
  pool,
  initialValues,
  tokens,
}) => {
  const { isReady } = useTerra();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      token1: {
        amount: undefined,
        asset: pool?.token1,
      },
      token2: {
        amount: undefined,
        asset: pool?.token2,
      },
    },
  });
  const token1 = watch("token1");
  const token2 = watch("token2");
  const provideState = useProvideSingle({
    contract: pair.contract,
    pool: pair.pool,
    token1: token1.asset,
    token2: token2.asset,
    amount: toAmount(token1.amount),
  });
  const balance = useBalance(token1.asset);
  const amount = lookup(balance, token1.asset);

  const handleChange = (value) => {
    setValue("token1", {
      ...token1,
      amount: value,
    });
  };

  const submit = async () => {
    provideState.provideLiquidity();
  };

  return (
    <chakra.form onSubmit={handleSubmit(submit)} width="full">
      <Card>
        <Controller
          name="token1"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <AmountInput {...field} isLoading={!isReady} tokens={tokens} />
          )}
        />
      </Card>

      <Card mt="2">
        <Slider
          variant="brand"
          size="lg"
          min={0}
          defaultValue={0}
          // value={token1.amount}
          max={Number(amount)}
          onChange={handleChange}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Card>

      <ProvideFormFooter data={provideState} />
    </chakra.form>
  );
};

export default ProvideSingleForm;
