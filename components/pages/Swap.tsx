import React from "react";
import { Box, Flex } from "@chakra-ui/react";

import SwapForm from "components/swap/SwapForm";

const Swap = () => {
  return (
    <Flex h="100%" justify="center">
      <Box w="650px">
        <SwapForm />
      </Box>
    </Flex>
  );
};

export default Swap;
