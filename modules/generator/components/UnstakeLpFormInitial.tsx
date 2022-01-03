import React from "react";
import { Text, Flex, Box } from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { num } from "@arthuryeti/terra";

import {
  StakeLpTokenState,
  useStakedLpAmount,
  UnstakeLpFormFooter,
} from "modules/generator";
import { FormActions, FormActionItem } from "modules/common";
import { PoolFormType } from "types/common";
import { ONE_TOKEN } from "constants/constants";

import Card from "components/Card";
import TokenInput from "components/TokenInput";
import NewAmountInput from "components/NewAmountInput";
import AstroSlider from "components/AstroSlider";

type Params = {
  state: StakeLpTokenState;
  type: PoolFormType;
  onTypeClick: any;
  isChartOpen: boolean;
  onChartClick: () => void;
  onClick: () => void;
};

const UnstakeLpFormInitial = ({
  type,
  onTypeClick,
  state,
  onClick,
}: Params) => {
  const { control, watch, setValue } = useFormContext();

  const token = watch("token");
  const amount = watch("amount");
  const stakedAmount = useStakedLpAmount(token);
  const max = num(stakedAmount).div(ONE_TOKEN).toNumber();

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
          Unstake your LP tokens below. Any ASTRO rewards accrued can be claimed
          in your rewards center. If you unstake all of your LP tokens, you stop
          receiving ASTRO and potential third party rewards.
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
                <NewAmountInput
                  asset={token}
                  balance={stakedAmount}
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

      <UnstakeLpFormFooter data={state} onConfirmClick={onClick} />
    </>
  );
};

export default UnstakeLpFormInitial;
