import React from "react";
import { Text, Flex, Box } from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import num from "libs/num";

import { StakeLpFormFooter, StakeLpTokenState } from "modules/generator";
import { useBalance, FormActionItem, FormActions } from "modules/common";
import { ONE_TOKEN } from "constants/constants";
import { PoolFormType } from "types/common";

import Card from "components/Card";
import TokenInput from "components/TokenInput";
import NewAmountInput from "components/NewAmountInput";
import AstroSlider from "components/AstroSlider";
import WarningMessage from "components/common/WarningMessage";

type Params = {
  state: StakeLpTokenState;
  error: any;
  txFeeNotEnough?: boolean;
  type: PoolFormType;
  onTypeClick: any;
  isChartOpen: boolean;
  onChartClick: () => void;
  onClick: () => void;
};

const StakeLpFormInitial = ({
  type,
  onTypeClick,
  isChartOpen,
  onChartClick,
  state,
  error,
  txFeeNotEnough,
  onClick,
}: Params) => {
  const { control, watch, setValue } = useFormContext();

  const token = watch("token");
  const amount = watch("amount");
  const balance = useBalance(token);
  const max = num(balance).div(ONE_TOKEN).toNumber();

  const handleChange = (value: number) => {
    setValue("amount", String(value));
  };

  return (
    <>
      <FormActions>
        <FormActionItem
          label="Stake"
          value={type}
          type={PoolFormType.Stake}
          onClick={() => onTypeClick(PoolFormType.Stake)}
        />
        <FormActionItem
          label="Unstake"
          type={PoolFormType.Unstake}
          value={type}
          onClick={() => onTypeClick(PoolFormType.Unstake)}
        />
      </FormActions>

      <Card mb="2">
        <Text textStyle="small" variant="secondary">
          ASTRO Generators give out ASTRO emissions and, on a case by case
          basis, third-party token incentives. Stake your Astroport LP tokens to
          receive emissions.
        </Text>
      </Card>

      <Card>
        <Flex>
          <Box flex="1">
            <Controller
              name="token"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TokenInput {...field} isLpToken isSingle />
              )}
            />
          </Box>
          <Box flex="1" pl="8">
            <Controller
              name="amount"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <NewAmountInput asset={token} isLpToken {...field} />
              )}
            />
          </Box>
        </Flex>
      </Card>

      <Card mt="2">
        <AstroSlider
          min={0}
          minLabel="0%"
          max={max}
          maxLabel="100%"
          step={0.01}
          value={+amount}
          onChange={handleChange}
        />
      </Card>

      {state.error && (
        <Card mt="2">
          <Text textStyle="small" variant="secondary">
            {state.error}
          </Text>
        </Card>
      )}

      <StakeLpFormFooter
        data={state}
        txFeeNotEnough={txFeeNotEnough}
        onConfirmClick={onClick}
      />
      {error && <WarningMessage mb="8" content={error} />}
    </>
  );
};

export default StakeLpFormInitial;
