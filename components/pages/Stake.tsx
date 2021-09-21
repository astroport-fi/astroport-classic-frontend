import React from "react";
import { Box, Center } from "@chakra-ui/react";

import StakeForm from "components/stake/StakeForm";

const Stake = () => {
  return (
    <Center h="100%">
      <Box w="650px">
        <StakeForm />
      </Box>
    </Center>
  );
};

export default Stake;
