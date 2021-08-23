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
import { useProvide, calculateToken2Amount } from "modules/pool";
import ProvideLiquidityFormFooter from "components/pool/provide/ProvideLiquidityFormFooter";
import useThrottle from "hooks/useThrottle";

type Props = {
  pair: any;
  initialValues: {
    token1: string;
    token2: string;
  };
};

const ProvideLiquidityForm: FC<Props> = ({ pair, initialValues }) => {
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
        asset: initialValues?.token1,
      },
      token2: {
        amount: undefined,
        asset: initialValues?.token2,
      },
    },
  });
  const token1 = watch("token1");
  const token2 = watch("token2");
  const provideState = useProvide({
    pair: pair,
    token1: token1.asset,
    token2: token2.asset,
    amount1: toAmount(token1.amount),
    amount2: toAmount(token2.amount),
  });
  const balance = useBalance(token1.asset);
  const amount = lookup(balance, token1.asset);

  const changeToken2Amount = useThrottle(() => {
    if (!token1.amount || token1.amount === 0) {
      return;
    }

    setValue("token2", {
      ...token2,
      amount: calculateToken2Amount(pair, token1.asset, token1.amount),
    });
  }, 300);

  useEffect(() => {
    changeToken2Amount();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token1]);

  const submit = async (data) => {
    // provideState.swap();
  };

  const handleChange = (value) => {
    setValue("token1", {
      ...token1,
      amount: value,
    });
  };

  return (
    <chakra.form onSubmit={handleSubmit(submit)} width="full">
      <Card>
        <Controller
          name="token1"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <AmountInput {...field} isLoading={!isReady} isSingle />
          )}
        />
      </Card>

      <Card mt="2">
        <Controller
          name="token2"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <AmountInput {...field} isLoading={!isReady} isSingle />
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

      <ProvideLiquidityFormFooter data={provideState} />
    </chakra.form>
  );
};

export default ProvideLiquidityForm;
