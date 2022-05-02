import React, { FC } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { fromTerraAmount } from "libs/terra";
import { WithdrawState } from "modules/pool";
import { useBalance, FormActions, FormActionItem } from "modules/common";
import { PoolFormType } from "types/common";
import Card from "components/Card";
import WarningMessage from "components/common/WarningMessage";
import NewAmountInput from "components/NewAmountInput";
import WithdrawFormFooter from "components/pool/withdraw/WithdrawFormFooter";
import WithdrawFormItem from "components/pool/withdraw/WithdrawFormItem";
import AstroSlider from "components/AstroSlider";
import TokenInput from "components/TokenInput";

type Props = {
  pool: any;
  token: string;
  amount: string;
  error: any;
  type: PoolFormType;
  onTypeClick: (v: PoolFormType) => void;
  state: WithdrawState;
  txFeeNotEnough?: boolean;
  onClick: () => void;
};

const WithdrawFormInitial: FC<Props> = ({
  pool,
  type,
  token,
  amount,
  error,
  onTypeClick,
  state,
  txFeeNotEnough,
  onClick,
}) => {
  const { control, setValue } = useFormContext();

  const balance = useBalance(token);
  const formattedBalance = fromTerraAmount(balance, "0.000000");

  const handleChange = (value: number) => {
    setValue("amount", String(value));
  };

  const renderWithdrawFormItem = (
    token: any,
    amount: any,
    poolType: string | null
  ) => {
    return (
      <WithdrawFormItem
        token={token}
        amount={amount}
        poolType={poolType}
        mb="4"
      />
    );
  };

  return (
    <>
      <FormActions>
        <FormActionItem
          label="Provide"
          value={type}
          type={PoolFormType.Provide}
          onClick={() => onTypeClick(PoolFormType.Provide)}
        />
        <FormActionItem
          label="Withdraw"
          type={PoolFormType.Withdraw}
          value={type}
          onClick={() => onTypeClick(PoolFormType.Withdraw)}
        />
      </FormActions>

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
                  hidePrice
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
          {renderWithdrawFormItem(
            state.token1,
            state.token1Amount,
            pool.poolType
          )}
          {renderWithdrawFormItem(
            state.token2,
            state.token2Amount,
            pool.poolType
          )}
        </Box>
      </Card>

      <WithdrawFormFooter
        pool={pool}
        amount={amount}
        data={state}
        txFeeNotEnough={!!txFeeNotEnough}
        onConfirmClick={onClick}
      />

      {error && <WarningMessage mb="8" content={error} />}
    </>
  );
};

export default WithdrawFormInitial;
