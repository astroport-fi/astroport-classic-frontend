import React, { FC, useState } from "react";
import {
  Box,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { num, useBalance } from "@arthuryeti/terra";

import { lookup } from "libs/parse";
import { WithdrawState } from "modules/pool";
import { PoolFormType, ProvideFormMode } from "types/common";

import Card from "components/Card";
import AmountInput from "components/AmountInput";
import WithdrawFormFooter from "components/pool/withdraw/WithdrawFormFooter";
import WithdrawFormItem from "components/pool/withdraw/WithdrawFormItem";
import PoolActions from "components/pool/PoolActions";
import PoolHeader from "components/pool/PoolHeader";

type Props = {
  pool: any;
  token: {
    asset: string;
    amount: string;
  };
  mode: ProvideFormMode;
  type: PoolFormType;
  onModeClick: (v: ProvideFormMode) => void;
  onTypeClick: (v: PoolFormType) => void;
  state: WithdrawState;
  onClick: () => void;
};

const WithdrawFormInitial: FC<Props> = ({
  pool,
  mode,
  type,
  token,
  onModeClick,
  onTypeClick,
  state,
  onClick,
}) => {
  const { control, setValue } = useFormContext();
  const [isChartOpen, setIsChartOpen] = useState<boolean>(false);

  const balance = useBalance(token.asset);
  const amount = lookup(balance, token.asset);

  const handleChange = (value: number) => {
    setValue("token", {
      ...token,
      amount: String(value),
    });
  };

  const renderWithdrawFormItem = (token: any, amount: any) => {
    return <WithdrawFormItem token={token} amount={amount} mb="4" />;
  };

  return (
    <>
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
          name="token"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <AmountInput {...field} max={Number(amount)} isSingle isLpToken />
          )}
        />
      </Card>

      <Card mt="2" border="0">
        <Text variant="light">Recovered Assets</Text>

        <Box mt="6" mb="4">
          {renderWithdrawFormItem(state.token1, state.token1Amount)}
          {renderWithdrawFormItem(state.token2, state.token2Amount)}
        </Box>
      </Card>

      <Card mt="2">
        <Slider
          variant="brand"
          size="lg"
          min={0}
          defaultValue={0}
          value={Number(token.amount)}
          focusThumbOnChange={false}
          max={Number(amount)}
          onChange={handleChange}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Card>

      <WithdrawFormFooter
        pool={pool}
        data={state}
        amount={num(amount)
          .minus(token.amount || "0")
          .toString()}
        onConfirmClick={onClick}
      />
    </>
  );
};

export default WithdrawFormInitial;
