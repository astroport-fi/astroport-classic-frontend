import React, { FC, ReactNode } from "react";
import { Box, Flex } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
};

const CardMobile: FC<Props> = ({ children }) => {
  return (
    <Box bg="white.50" mb="5" borderRadius="xl">
      <Flex flexDirection="column" p="5" align="flex-start">
        {children}
      </Flex>
    </Box>
  );
};

export default CardMobile;
