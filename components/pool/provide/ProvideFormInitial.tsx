import React, { FC, useEffect } from "react";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { useBalance } from "@arthuryeti/terra";

import { PoolFormType, ProvideFormMode } from "types/common";
import { calculateToken2Amount, ProvideState } from "modules/pool";
import useDebounceValue from "hooks/useDebounceValue";
import { lookup } from "libs/parse";

import Card from "components/Card";
import AmountInput from "components/AmountInput";
import PoolHeader from "components/pool/PoolHeader";
import PoolActions from "components/pool/PoolActions";
import ProvideFormFooter from "components/pool/provide/ProvideFormFooter";

type Props = {
  pool: any;
  mode: ProvideFormMode;
  type: PoolFormType;
  onModeClick: any;
  onTypeClick: any;
  token1: {
    amount: string;
    asset: string;
  };
  token2: {
    amount: string;
    asset: string;
  };
  isChartOpen: boolean;
  onChartClick: () => void;
  state: ProvideState;
  onClick: () => void;
};

const ProvideFormInitial: FC<Props> = ({
  pool,
  mode,
  type,
  onModeClick,
  onTypeClick,
  isChartOpen,
  onChartClick,
  token1,
  token2,
  state,
  onClick,
}) => {
  const { control, setValue } = useFormContext();

  const debouncedAmount1 = useDebounceValue(token1.amount, 200);

  const balance = useBalance(token1.asset);
  const amount = lookup(balance, token1.asset);

  const changeToken2Amount = () => {
    if (!token1.amount) {
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

  const handleChange = (value: number) => {
    setValue("token1", {
      ...token1,
      amount: String(value),
    });
  };

  return (
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
          render={({ field }) => (
            <AmountInput {...field} limit={Number(amount)} isSingle />
          )}
        />
      </Card>

      {mode == ProvideFormMode.Double && (
        <Card mt="2">
          <Controller
            name="token2"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <AmountInput {...field} isSingle />}
          />
        </Card>
      )}

      <Card mt="2">
        <Slider
          variant="brand"
          size="lg"
          min={0}
          defaultValue={0}
          focusThumbOnChange={false}
          value={Number(token1.amount)}
          max={Number(amount)}
          onChange={handleChange}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Card>

      <ProvideFormFooter pool={pool} data={state} onConfirmClick={onClick} />
    </>
  );
};

export default ProvideFormInitial;
