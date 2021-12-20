import React, { FC } from "react";
import { useFormContext } from "react-hook-form";
import { Box, Stack, Text } from "@chakra-ui/react";

import { AstroFormType } from "types/common";
import { StakeState } from "modules/astro";

import Card from "components/Card";
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
    setValue("amount", String(value));
  };

  return (
    <Box py="12">
      <StakeAstroHeader type={type} setType={setType} />
      <Stack direction="column" space={2}>
        <Card py={5} px={12}>
          <Text textStyle="small" variant="secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
            beatae error sit autem quidem deserunt delectus quisquam ullam
            arthuryetihuety dolor ex in, eveniet ratione voluptates fuga sed
            doloremque impedit eligendi perferendis?
          </Text>
        </Card>

        {type == AstroFormType.Stake && <StakeAstroFormInput />}
        {type == AstroFormType.Unstake && <UnstakeAstroFormInput />}

        <StakeAstroFooter
          data={state}
          isLoading={state.txStep == TxStep.Estimating}
          isDisabled={state.txStep != TxStep.Ready}
          handleChange={handleChange}
          token={token}
          title={type === AstroFormType.Stake ? "Stake ASTRO" : "Unstake ASTRO"}
          onClick={onClick}
        />
      </Stack>
    </Box>
  );
};

export default StakeAstroFormInitial;
