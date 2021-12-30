import React, { FC, ReactNode } from "react";
import { Box, Flex, StackDivider, HStack } from "@chakra-ui/react";

import BackButton from "components/BackButton";

type Props = {
  children: ReactNode;
};

const FormActions: FC<Props> = ({ children }) => {
  return (
    <Flex justify="space-between" color="white" mb="6" px="6">
      <Box flex="1">
        <HStack spacing={4}>
          <BackButton />
          <HStack
            h="4"
            spacing={3}
            divider={<StackDivider borderColor="white" h="4" />}
          >
            {children}
          </HStack>
        </HStack>
      </Box>
    </Flex>
  );
};

export default FormActions;
