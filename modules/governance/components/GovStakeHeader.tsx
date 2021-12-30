import React, { FC } from "react";
import { Flex, Text } from "@chakra-ui/react";

import { AstroFormType } from "types/common";

import FormHeader from "components/common/FormHeader";
import FormHeaderItem from "components/common/FormHeaderItem";

type Props = {
  type: AstroFormType;
  setType: (v: AstroFormType) => void;
};

const GovStakeHeader: FC<Props> = ({ type, setType }) => {
  return (
    <>
      <Flex aling="center" justify="space-between">
        <FormHeader>
          <FormHeaderItem
            label="Stake"
            value={type}
            type={AstroFormType.Stake}
            onClick={() => setType(AstroFormType.Stake)}
          />
          <Text>|</Text>
          <FormHeaderItem
            label="Unstake"
            value={type}
            type={AstroFormType.Unstake}
            onClick={() => setType(AstroFormType.Unstake)}
          />
        </FormHeader>
      </Flex>
    </>
  );
};

export default GovStakeHeader;
