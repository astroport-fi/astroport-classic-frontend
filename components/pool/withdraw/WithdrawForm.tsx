import React, { FC, useState } from "react";
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
import { useTokenInfo } from "@arthuryeti/terra";

import Card from "components/Card";
import AmountInput from "components/AmountInput";
import { toAmount, lookup } from "libs/parse";
import { useWithdraw } from "modules/pool";
import WithdrawFormFooter from "components/pool/withdraw/WithdrawFormFooter";
import WithdrawFormItem from "components/pool/withdraw/WithdrawFormItem";
import PoolActions from "components/pool/PoolActions";
import PoolHeader from "components/pool/PoolHeader";
import useDebounceValue from "hooks/useDebounceValue";
import { useBalance } from "hooks/useBalance";
import { PoolFormType, ProvideFormMode, Pool } from "types/common";

type Props = {
  pair: any;
  pool: Pool;
  mode: ProvideFormMode;
  type: PoolFormType;
  onModeClick: (v: ProvideFormMode) => void;
  onTypeClick: (v: PoolFormType) => void;
};

const WithdrawForm: FC<Props> = ({
  pair,
  pool,
  mode,
  type,
  onModeClick,
  onTypeClick,
}) => {
  const [isChartOpen, setIsChartOpen] = useState<boolean>(false);
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      token: {
        amount: undefined,
        asset: pair.lpToken,
      },
    },
  });

  const token = watch("token");

  const debouncedAmount = useDebounceValue(token.amount, 1000);

  const withdrawState = useWithdraw({
    contract: pair.contract,
    lpToken: pair.lpToken,
    amount: toAmount(debouncedAmount),
  });

  const balance = useBalance(token.asset);
  const amount = lookup(balance, token.asset);

  const submit = async () => {
    withdrawState.withdrawLiquidity();
  };

  const handleChange = (value) => {
    setValue("token", {
      ...token,
      amount: value,
    });
  };

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
          name="token"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <AmountInput {...field} isSingle isLpToken />}
        />
      </Card>

      <Card mt="2" border="0">
        <Text variant="light">Recovered Assets</Text>

        <Box mt="6">
          <WithdrawFormItem
            token={withdrawState.token1}
            amount={withdrawState.token1Amount}
          />

          <WithdrawFormItem
            token={withdrawState.token2}
            amount={withdrawState.token2Amount}
            pt="4"
          />
        </Box>
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

      <WithdrawFormFooter pool={pool} data={withdrawState} />
    </chakra.form>
  );
};

export default WithdrawForm;
