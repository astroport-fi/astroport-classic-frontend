import React from "react";
import { Box, Center } from "@chakra-ui/react";

import SwapForm from "components/swap/SwapForm";

const Swap = () => {
  return (
    <Center h="100%">
      <Box w="650px">
        <SwapForm />
      </Box>
    </Center>
  );
};

export default Swap;
