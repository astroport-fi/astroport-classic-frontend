import React, { FC, useEffect } from "react";
import {
  chakra,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";

import Card from "components/Card";
import AmountInput from "components/AmountInput";
import { toAmount, lookup } from "libs/parse";
import { useBalance } from "hooks/useBalance";
import { useProvide, calculateToken2Amount, ProvideStep } from "modules/pool";
import PoolHeader from "components/pool/PoolHeader";
import PoolActions from "components/pool/PoolActions";
import ProvideFormFooter from "components/pool/provide/ProvideFormFooter";
import ProvideFormConfirm from "components/pool/provide/ProvideFormConfirm";
import useDebounceValue from "hooks/useDebounceValue";
import { PoolFormType, ProvideFormMode, Pair } from "types/common";

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
  mode: ProvideFormMode;
  type: PoolFormType;
  onModeClick: any;
  onTypeClick: any;
  isChartOpen: boolean;
  onChartClick: () => void;
};

const ProvideForm: FC<Props> = ({
  pair,
  pool,
  mode,
  onModeClick,
  type,
  onTypeClick,
  isChartOpen,
  onChartClick,
}) => {
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

  const debouncedAmount1 = useDebounceValue(token1.amount, 1000);
  const debouncedAmount2 = useDebounceValue(token2.amount, 1000);

  const provideState = useProvide({
    contract: pair.contract,
    pool: pool,
    token1: token1.asset,
    token2: token2.asset,
    amount1: toAmount(debouncedAmount1),
    amount2: toAmount(debouncedAmount2),
  });
  const balance = useBalance(token1.asset);
  const amount = lookup(balance, token1.asset);

  const changeToken2Amount = () => {
    if (!token1.amount || Number(token1.amount) === 0) {
      return;
    }

    setValue("token2", {
      ...token2,
      amount: calculateToken2Amount(pool, token1.asset, debouncedAmount1),
    });
  };

  useEffect(() => {
    changeToken2Amount();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedAmount1]);

  const submit = async () => {
    provideState.provideLiquidity();
  };

  const handleChange = (value: number) => {
    setValue("token1", {
      ...token1,
      amount: String(value),
    });
  };

  return (
    <chakra.form onSubmit={handleSubmit(submit)} width="full">
      {provideState.step === ProvideStep.Initial && (
        <>
          <PoolActions
            pool={pool}
            type={type}
            isChartOpen={isChartOpen}
            onChartClick={onChartClick}
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
              render={({ field }) => <AmountInput {...field} isSingle />}
            />
          </Card>

          <Card mt="2">
            <Controller
              name="token2"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <AmountInput {...field} isSingle />}
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
            onConfirmClick={() => provideState.setStep(ProvideStep.Confirm)}
          />
        </>
      )}

      {provideState.step === ProvideStep.Confirm && (
        <ProvideFormConfirm from={token1} to={token2} state={provideState} />
      )}
    </chakra.form>
  );
};

export default ProvideForm;
