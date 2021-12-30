import React, { FC } from "react";
import { useFormContext } from "react-hook-form";
import { Box, Stack, Text } from "@chakra-ui/react";
import { TxStep } from "@arthuryeti/terra";

import { AstroFormType } from "types/common";
import { StakeState } from "modules/governance";

import Card from "components/Card";
import GovStakeFormInput from "./GovStakeFormInput";
import GovStakeFooter from "./GovStakeFooter";
import GovStakeHeader from "./GovStakeHeader";
import GovUnstakeFormInput from "./GovUnstakeFormInput";

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
  return (
    <Box py="12">
      <GovStakeHeader type={type} setType={setType} />

      <Stack direction="column" space={2}>
        <Card py={5} px={12}>
          <Text textStyle="small" variant="secondary">
            {type == AstroFormType.Stake &&
              "Stake ASTRO for xASTRO to participate in Astroport governance."}
            {type == AstroFormType.Unstake &&
              "Unstake xASTRO for ASTRO. If you unstake all of your xASTRO, you will no longer be able to participate in governance."}
          </Text>
        </Card>

        {type == AstroFormType.Stake && <GovStakeFormInput />}
        {type == AstroFormType.Unstake && <GovUnstakeFormInput />}

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
