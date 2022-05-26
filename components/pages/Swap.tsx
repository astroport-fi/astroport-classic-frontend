import React, { FC } from "react";
import { Box, Flex } from "@chakra-ui/react";

import SwapForm from "components/swap/SwapForm";

type Props = {
  token1?: string;
  token2?: string;
};

const Swap: FC<Props> = ({ token1, token2 }) => {
  return (
    <Box m="0 auto" pt="6">
      <Flex justify="center">
        <Box maxW="650px" mx="6" mt={[25, 25, 10]} mb={[100, 100, 25]} w="full">
          <SwapForm defaultToken1={token1 || ""} defaultToken2={token2 || ""} />
        </Box>
      </Flex>
    </Box>
  );
};

export default Swap;
