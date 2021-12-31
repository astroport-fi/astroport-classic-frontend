import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Box, Stack, Text, Flex } from "@chakra-ui/react";
import { num, TxStep, useBalance } from "@arthuryeti/terra";

import { AstroFormType } from "types/common";
import { FormActionItem, FormActions } from "modules/common";
import { StakeState } from "modules/governance";

import Card from "components/Card";
import GovStakeFooter from "./GovStakeFooter";
import TokenInput from "components/TokenInput";
import NewAmountInput from "components/NewAmountInput";

type Props = {
  type: AstroFormType;
  setType: (v: AstroFormType) => void;
  amount: string;
  state: StakeState;
  onClick: () => void;
};

const GovStakeFormInitial: FC<Props> = ({
  type,
  setType,
  amount,
  state,
  onClick,
}) => {
  const { control, watch } = useFormContext();
  const { token } = watch();
  const balData = useBalance(token);
  const balance = num(balData)
    .div(10 ** 6)
    .toNumber();

  return (
    <Box py="12">
      <FormActions>
        <FormActionItem
          label="Stake"
          value={type}
          type={AstroFormType.Stake}
          onClick={() => setType(AstroFormType.Stake)}
        />
        <FormActionItem
          label="Unstake"
          type={AstroFormType.Unstake}
          value={type}
          onClick={() => setType(AstroFormType.Unstake)}
        />
      </FormActions>

      <Stack direction="column" space={2}>
        <Card py={5} px={12}>
          <Text textStyle="small" variant="secondary">
            {type == AstroFormType.Stake && "Stake ASTRO for xASTRO."}
            {type == AstroFormType.Unstake && "Unstake ASTRO from xASTRO."}
          </Text>
        </Card>

        <Card py="10">
          <Flex>
            <Box flex="1" pr="8">
              <Controller
                name="token"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TokenInput hidePrice isSingle {...field} />
                )}
              />
            </Box>
            <Box flex="1">
              <Controller
                name="amount"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <NewAmountInput
                    asset={token}
                    max={balance}
                    hidePrice
                    {...field}
                  />
                )}
              />
            </Box>
          </Flex>
        </Card>

        <GovStakeFooter
          data={state}
          type={type}
          isLoading={state.txStep == TxStep.Estimating}
          isDisabled={state.txStep != TxStep.Ready}
          amount={amount}
          onClick={onClick}
        />
      </Stack>
    </Box>
  );
};

export default GovStakeFormInitial;
