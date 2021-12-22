import React, { FC } from "react";
import { Box, Flex } from "@chakra-ui/react";

import SwapForm from "components/swap/SwapForm";

type Props = {
  token1?: string;
  token2?: string;
};

const Swap: FC<Props> = ({ token1, token2 }) => {
  return (
    <Flex h="100%" justify="center">
      <Box w="650px">
        <SwapForm defaultToken1={token1} defaultToken2={token2} />
      </Box>
    </Flex>
  );
};

export default Swap;
