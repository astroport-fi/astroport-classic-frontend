import React, { FC } from "react";
import { Flex, Box } from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { num, useBalance } from "@arthuryeti/terra";

import { PoolFormType, ProvideFormMode } from "types/common";
import { ProvideState, Pool } from "modules/pool";
import { useTokenInfo } from "modules/common";

import Card from "components/Card";
import NewAmountInput from "components/NewAmountInput";
import TokenInput from "components/TokenInput";
import PoolHeader from "components/pool/PoolHeader";
import PoolActions from "components/pool/PoolActions";
import ProvideFormFooter from "components/pool/provide/ProvideFormFooter";
import AstroSlider from "components/AstroSlider";

type Props = {
  pool: Pool;
  mode: ProvideFormMode;
  type: PoolFormType;
  onModeClick: any;
  onTypeClick: any;
  token1: string;
  amount1: string;
  token2: string;
  amount2: string;
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
  amount1,
  token2,
  amount2,
  state,
  onClick,
}) => {
  const { getDecimals } = useTokenInfo();
  const token1Balance = useBalance(token1);
  const token2Balance = useBalance(token2);
  const token1Decimals = getDecimals(token1);
  const token2Decimals = getDecimals(token2);
  const { control, setValue } = useFormContext();
  // const ratio = num(pool.token2.share).div(pool.token1.share).toNumber();
  const ratio = num(pool.token2.share)
    .div(10 ** token2Decimals)
    .div(num(pool.token1.share).div(10 ** token1Decimals))
    .toNumber();

  const balances = {
    token1: num(token1Balance)
      .div(10 ** token1Decimals)
      .dp(2)
      .toNumber(),
    token2: num(token2Balance)
      .div(10 ** token2Decimals)
      .dp(2)
      .toNumber(),
  };

  let maxAmounts = {
    token1: num(Math.min(balances.token1, balances.token2 / ratio))
      .dp(6)
      .toNumber(),
    token2: num(Math.min(balances.token2, balances.token1 * ratio))
      .dp(6)
      .toNumber(),
  };

  if (num(ratio).isNaN()) {
    maxAmounts = balances;
  }

  const getInputProps = (field) => {
    return {
      ...field,
      onChange: (value) => {
        if (num(ratio).gt(0)) {
          let newAmount = num(value).times(ratio).dp(6).toString();
          let fieldToUpdate = "amount2";

          if (field.name === "amount2") {
            fieldToUpdate = "amount1";
            newAmount = num(value).div(ratio).dp(6).toString();
          }

          setValue(fieldToUpdate, newAmount);

          if (num(value).eq(0) || value == "") {
            setValue(fieldToUpdate, "");
          }
        }

        field.onChange(value);
      },
    };
  };

  const handleChange = (value: number) => {
    if (num(ratio).gt(0)) {
      let newAmount = num(value).times(ratio).dp(6).toString();
      setValue("amount2", newAmount);
    }

    setValue("amount1", String(value));
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
        <Flex>
          <Box flex="1" pr="8">
            <Controller
              name="token1"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <TokenInput isSingle {...field} />}
            />
          </Box>
          <Box flex="1">
            <Controller
              name="amount1"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <NewAmountInput
                  asset={token1}
                  max={maxAmounts.token1}
                  {...getInputProps(field)}
                />
              )}
            />
          </Box>
        </Flex>
      </Card>

      {mode == ProvideFormMode.Double && (
        <Card mt="2">
          <Flex>
            <Box flex="1" pr="8">
              <Controller
                name="token2"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <TokenInput isSingle {...field} />}
              />
            </Box>
            <Box flex="1">
              <Controller
                name="amount2"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <NewAmountInput
                    asset={token2}
                    max={maxAmounts.token2}
                    {...getInputProps(field)}
                  />
                )}
              />
            </Box>
          </Flex>
        </Card>
      )}

      <Card mt="2">
        <AstroSlider
          min={0}
          minLabel="0%"
          max={maxAmounts.token1}
          maxLabel="100%"
          step={0.0001}
          value={+amount1}
          onChange={handleChange}
        />
      </Card>

      <ProvideFormFooter
        pool={pool}
        amount1={amount1}
        amount2={amount2}
        data={state}
        onConfirmClick={onClick}
      />

      {/* <Flex mt={4} mb={8} justifyContent="center">
        <Controller
          name="autoStake"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Checkbox
              colorScheme="whatsapp"
              iconColor="brand.deepBlue"
              color="green.500"
              borderColor="green.500"
              {...field}
            >
              <Text fontSize="xs">Stake LP Token</Text>
            </Checkbox>
          )}
        />
      </Flex> */}
    </>
  );
};

export default ProvideFormInitial;
