import React, { FC } from "react";

import { useFormContext, Controller } from "react-hook-form";
import { fromTerraAmount, num, useBalance } from "@arthuryeti/terra";

import { PoolFormType, ProvideFormMode } from "types/common";
import { calculateTokenAmount, ProvideState } from "modules/pool";

import Card from "components/Card";
import AmountInput from "components/AmountInput";
import Slider from "components/common/Slider";
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
  const token1Balance = useBalance(token1.asset);
  const token2Balance = useBalance(token2.asset);
  const { control, setValue } = useFormContext();

  const balance = useBalance(token1.asset);
  const amount = fromTerraAmount(balance, "0.00");

  //TODO: refactor with function below
  const handleToken1Change = (value: any, onChange: (value: any) => void) => {
    const formattedToken2Balance = fromTerraAmount(token2Balance, "0.0[00000]");
    const token2amount = calculateTokenAmount(pool, value.asset, value.amount);
    const potentialToken1amount = calculateTokenAmount(
      pool,
      token2.asset,
      formattedToken2Balance
    );

    if (num(token2amount).gt(formattedToken2Balance)) {
      setValue(
        "token2.amount",
        num(formattedToken2Balance).minus("4").toString()
      );
      onChange({ ...value, amount: potentialToken1amount });
    } else {
      onChange(value);
      setValue("token2.amount", token2amount);
    }
  };

  //TODO: refactor with above function
  const handleToken2Change = (value: any, onChange: (value: any) => void) => {
    const formattedToken1Balance = fromTerraAmount(token1Balance, "0.0[00000]");
    const token1amount = calculateTokenAmount(pool, value.asset, value.amount);
    const potentialToken1amount = calculateTokenAmount(
      pool,
      token1.asset,
      formattedToken1Balance
    );

    if (num(token1amount).gt(formattedToken1Balance)) {
      setValue("token2.amount", formattedToken1Balance);
      onChange({ ...value, amount: potentialToken1amount });
    } else {
      onChange(value);
      setValue("token1.amount", token1amount);
    }
  };

  //TODO: refactor with above function
  const handleChange = (value: number) => {
    const formattedToken2Balance = fromTerraAmount(token2Balance, "0.0[00000]");
    const token2amount = calculateTokenAmount(
      pool,
      token1.asset,
      String(value)
    );
    const potentialToken1amount = calculateTokenAmount(
      pool,
      token2.asset,
      formattedToken2Balance
    );

    if (num(token2amount).gt(formattedToken2Balance)) {
      setValue(
        "token2.amount",
        num(formattedToken2Balance).minus("4").toString()
      );
      setValue("token1.amount", potentialToken1amount);
    } else {
      setValue("token1.amount", String(value));
      setValue("token2.amount", token2amount);
    }
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
            <AmountInput
              {...field}
              limit={+amount}
              isSingle
              onChange={(v: any) => handleToken1Change(v, field.onChange)}
            />
          )}
        />
      </Card>

      {mode == ProvideFormMode.Double && (
        <Card mt="2">
          <Controller
            name="token2"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <AmountInput
                {...field}
                isSingle
                onChange={(v: any) => handleToken2Change(v, field.onChange)}
              />
            )}
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
        />
      </Card>

      <ProvideFormFooter
        pool={pool}
        amount={token1.amount}
        data={state}
        onConfirmClick={onClick}
      />
    </>
  );
};

export default ProvideFormInitial;
