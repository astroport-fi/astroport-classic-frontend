import React, { FC } from "react";
import { useFormContext } from "react-hook-form";
import { Box } from "@chakra-ui/react";

import { AstroFormType } from "types/common";
import { StakeState } from "modules/astro";

import StakeAstroFormInput from "components/astro/StakeAstroFormInput";
import StakeAstroFooter from "components/astro/StakeAstroFooter";
import StakeAstroHeader from "components/astro/StakeAstroHeader";
import { TxStep } from "@arthuryeti/terra";
import UnstakeAstroFormInput from "./UnstakeAstroFormInput";

type Props = {
  type: AstroFormType;
  setType: (v: AstroFormType) => void;
  token: any;
  state: StakeState;
  onClick: () => void;
};

const StakeAstroFormInitial: FC<Props> = ({
  type,
  setType,
  token,
  state,
  onClick,
}) => {
  const { setValue } = useFormContext();

  const handleChange = (value: number) => {
    setValue("token", {
      ...token,
      amount: String(value),
    });
  };

  return (
    <Box mt="24">
      <StakeAstroHeader type={type} setType={setType} />

      {type == AstroFormType.Stake && <StakeAstroFormInput />}
      {type == AstroFormType.Unstake && <UnstakeAstroFormInput />}

      <StakeAstroFooter
        isLoading={state.txStep == TxStep.Estimating}
        isDisabled={state.txStep != TxStep.Ready}
        handleChange={handleChange}
        token={token}
        title="Stake Astro"
        onClick={onClick}
      />
    </Box>
  );
};

export default StakeAstroFormInitial;
