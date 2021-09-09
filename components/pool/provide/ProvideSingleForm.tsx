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
import { useBalance, useTerra } from "@arthuryeti/terra";
import { useProvideSingle } from "modules/pool";
import ProvideFormFooter from "components/pool/provide/ProvideFormFooter";
import useDebounceValue from "hooks/useDebounceValue";

type Props = {
  pair: any;
  pool: any;
  initialValues: {
    token: string;
  };
  tokens: string[];
};

const ProvideSingleForm: FC<Props> = ({ pair, pool, tokens }) => {
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

  const debouncedToken1 = useDebounceValue(token1, 1000);

  const provideState = useProvideSingle({
    contract: pair.contract,
    pool,
    token1: debouncedToken1.asset,
    token2: token2.asset,
    amount: toAmount(debouncedToken1.amount),
  });

  const balance = useBalance(debouncedToken1.asset);
  const amount = lookup(balance, debouncedToken1.asset);

  const handleChange = (value) => {
    setValue("token1", {
      ...debouncedToken1,
      amount: value,
    });
  };

  const submit = async () => {
    provideState.provideLiquidity();
  };

  useEffect(() => {
    if (debouncedToken1.asset === token2.asset) {
      if (pool.token1 === token2.asset) {
        setValue("token2", {
          asset: pool.token2,
          amount: undefined,
        });
      }

      if (pool.token2 === token2.asset) {
        setValue("token2", {
          asset: pool.token1,
          amount: undefined,
        });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedToken1.asset]);

  return (
    <chakra.form onSubmit={handleSubmit(submit)} width="full">
      <Card>
        <Controller
          name="token1"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <AmountInput {...field} tokens={tokens} />}
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

      <ProvideFormFooter pool={pool} data={provideState} />
    </chakra.form>
  );
};

export default ProvideSingleForm;
