import React, { FC, ReactNode } from "react";
import { Box, Flex, HStack } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  isChartOpen?: boolean;
  onChartClick?: (v: any) => void;
};

const FormHeader: FC<Props> = ({ children }) => {
  return (
    <Flex justify="space-between" color="white" mb="4" px="6">
      <Box flex="1">
        <HStack>{children}</HStack>
      </Box>
    </Flex>
  );
};

export default FormHeader;
