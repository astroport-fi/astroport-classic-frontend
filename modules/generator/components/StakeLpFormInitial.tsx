import React from "react";
import { Text, Flex, Box, useMediaQuery } from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import num from "libs/num";

import { StakeLpFormFooter, StakeLpTokenState } from "modules/generator";
import { useBalance, FormActionItem, FormActions } from "modules/common";
import { ONE_TOKEN, MOBILE_MAX_WIDTH } from "constants/constants";
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
  onClick: () => void;
};

const StakeLpFormInitial = ({
  type,
  onTypeClick,
  state,
  error,
  txFeeNotEnough,
  onClick,
}: Params) => {
  const [isMobile] = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH})`);
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

      <Card {...(isMobile && { px: "4", py: "4" })}>
        <Flex {...(isMobile && { borderRadius: "2xl", overflow: "hidden" })}>
          <Box
            flex="1"
            {...(isMobile && { width: "50%", overflow: "hidden" })}
            {...(!isMobile && { pr: "8" })}
          >
            <Controller
              name="token"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TokenInput
                  isSingle
                  isMobile={!!isMobile}
                  isLpToken
                  {...field}
                />
              )}
            />
          </Box>
          <Box flex="1" {...(isMobile && { width: "50%", overflow: "hidden" })}>
            <Controller
              name="amount"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <NewAmountInput
                  asset={token}
                  isMobile={!!isMobile}
                  isLpToken
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

      <StakeLpFormFooter
        data={state}
        txFeeNotEnough={!!txFeeNotEnough}
        onConfirmClick={onClick}
      />
      {error && <WarningMessage mb="8" content={error} />}
    </>
  );
};

export default StakeLpFormInitial;
