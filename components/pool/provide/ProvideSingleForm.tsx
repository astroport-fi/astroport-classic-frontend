import React, { FC, useEffect, useState } from "react";
import {
  chakra,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";

import useDebounceValue from "hooks/useDebounceValue";
import { PoolFormType, ProvideFormMode, Pair } from "types/common";
import { useProvideSingle, ProvideSingleStep } from "modules/pool";
import { useBalance } from "hooks/useBalance";
import { toAmount, lookup } from "libs/parse";

import Card from "components/Card";
import AmountInput from "components/AmountInput";
import PoolHeader from "components/pool/PoolHeader";
import PoolActions from "components/pool/PoolActions";
import ProvideFormFooter from "components/pool/provide/ProvideFormFooter";

type FormValues = {
  token1: {
    amount: string;
    asset: string;
  };
  token2: {
    amount: string;
    asset: string;
  };
};

type Props = {
  pair: Pair;
  pool: any;
  tokens: string[];
  mode: ProvideFormMode;
  onModeClick: (v: ProvideFormMode) => void;
  type: PoolFormType;
  onTypeClick: (v: PoolFormType) => void;
};

const ProvideSingleForm: FC<Props> = ({
  pair,
  pool,
  tokens,
  mode,
  onModeClick,
  type,
  onTypeClick,
}) => {
  const [isChartOpen, setIsChartOpen] = useState<boolean>(false);
  const { control, handleSubmit, watch, setValue } = useForm<FormValues>({
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

  const debouncedToken1 = useDebounceValue(token1, 500);

  const provideState = useProvideSingle({
    contract: pair.contract,
    pool,
    token1: debouncedToken1.asset,
    token2: token2.asset,
    amount: toAmount(debouncedToken1.amount),
  });

  const balance = useBalance(debouncedToken1.asset);
  const amount = lookup(balance, debouncedToken1.asset);

  const handleChange = (value: number) => {
    setValue("token1", {
      ...debouncedToken1,
      amount: String(value),
    });
  };

  const submit = async () => {
    provideState.provideLiquidity();
  };

  useEffect(() => {
    if (debouncedToken1.asset === token2.asset) {
      if (pool.token1 === token2.asset) {
        setValue("token2", {
          ...token2,
          asset: pool.token2,
        });
      }

      if (pool.token2 === token2.asset) {
        setValue("token2", {
          ...token2,
          asset: pool.token1,
        });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedToken1.asset]);

  return (
    <chakra.form onSubmit={handleSubmit(submit)} width="full">
      <PoolActions
        pool={pool}
        type={type}
        isChartOpen={isChartOpen}
        onChartClick={setIsChartOpen}
        onTypeClick={onTypeClick}
      />
      <PoolHeader
        pool={pool}
        type={type}
        mode={mode}
        onModeClick={onModeClick}
      />
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

      <ProvideFormFooter
        pool={pool}
        data={provideState}
        onConfirmClick={() => provideState.setStep(ProvideSingleStep.Confirm)}
      />
    </chakra.form>
  );
};

export default ProvideSingleForm;
