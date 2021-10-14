import React, { FC } from "react";
import { Flex, Text } from "@chakra-ui/react";

import { AstroFormType } from "types/common";

import FormHeader from "components/common/FormHeader";
import FormHeaderItem from "components/common/FormHeaderItem";
import Card from "components/Card";

type Props = {
  type: AstroFormType;
  setType: (v: AstroFormType) => void;
};

const StakeAstroHeader: FC<Props> = ({ type, setType }) => {
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
          <Text fontSize="xl">|</Text>
          <FormHeaderItem
            label="Unstake"
            value={type}
            type={AstroFormType.Unstake}
            onClick={() => setType(AstroFormType.Unstake)}
          />
        </FormHeader>
      </Flex>

      <Card mb="2">
        <Text variant="light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus beatae
          error sit autem quidem deserunt delectus quisquam ullam
          arthuryetihuety dolor ex in, eveniet ratione voluptates fuga sed
          doloremque impedit eligendi perferendis?
        </Text>
      </Card>
    </>
  );
};

export default StakeAstroHeader;
