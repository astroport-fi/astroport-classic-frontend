import React, { FC, useState } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { fromTerraAmount, num, useBalance } from "@arthuryeti/terra";

import { WithdrawState } from "modules/pool";
import { PoolFormType, ProvideFormMode } from "types/common";

import Card from "components/Card";
import NewAmountInput from "components/NewAmountInput";
import WithdrawFormFooter from "components/pool/withdraw/WithdrawFormFooter";
import WithdrawFormItem from "components/pool/withdraw/WithdrawFormItem";
import PoolActions from "components/pool/PoolActions";
import PoolHeader from "components/pool/PoolHeader";
import AstroSlider from "components/AstroSlider";
import TokenInput from "components/TokenInput";

type Props = {
  pool: any;
  token: string;
  amount: string;
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
  amount,
  onModeClick,
  onTypeClick,
  state,
  onClick,
}) => {
  const { control, setValue } = useFormContext();
  const [isChartOpen, setIsChartOpen] = useState<boolean>(false);

  const balance = useBalance(token);
  const formattedBalance = fromTerraAmount(balance, "0.000000");

  const handleChange = (value: number) => {
    setValue("amount", String(value));
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

      <Card>
        <Flex>
          <Box flex="1">
            <Controller
              name="token"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TokenInput isLpToken isSingle {...field} />
              )}
            />
          </Box>
          <Box flex="1" pl="8">
            <Controller
              name="amount"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <NewAmountInput
                  asset={token}
                  balanceLabel="Provided"
                  {...field}
                />
              )}
            />
          </Box>
        </Flex>
      </Card>

      <Card mt="2">
        <AstroSlider
          min={0}
          minLabel="0%"
          max={+formattedBalance}
          maxLabel="100%"
          step={0.01}
          value={+amount}
          onChange={handleChange}
        />
      </Card>

      <Card mt="2">
        <Text textStyle="small" variant="dimmed">
          Receivable Assets
        </Text>

        <Box mt="6" mb="4">
          {renderWithdrawFormItem(state.token1, state.token1Amount)}
          {renderWithdrawFormItem(state.token2, state.token2Amount)}
        </Box>
      </Card>

      <WithdrawFormFooter pool={pool} data={state} onConfirmClick={onClick} />
    </>
  );
};

export default WithdrawFormInitial;
