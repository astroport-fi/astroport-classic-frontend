import React, { useState } from "react";
import { Flex, Box } from "@chakra-ui/react";

import { AstroFormType } from "types/common";

import { GovStakeForm } from "modules/governance";
import { useRouter } from "next/router";

const GovStake = () => {
  const { query } = useRouter();
  const queryAction =
    query?.action == "stake" ? AstroFormType.Stake : AstroFormType.Unstake;
  const [type, setType] = useState(queryAction);

  return (
    <Flex h="100%" justify="center">
      <Box w="650px">
        <GovStakeForm type={type} setType={setType} />
      </Box>
    </Flex>
  );
};

export default GovStake;
