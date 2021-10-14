import React, { useState } from "react";
import { Flex, Box } from "@chakra-ui/react";

import { AstroFormType } from "types/common";

import StakeAstroForm from "components/astro/StakeAstroForm";

const AstroStake = () => {
  const [type, setType] = useState(AstroFormType.Stake);

  return (
    <Flex h="100%" justify="center">
      <Box w="650px">
        <StakeAstroForm type={type} setType={setType} />
      </Box>
    </Flex>
  );
};

export default AstroStake;
