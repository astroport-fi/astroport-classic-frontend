import React, { FC, ReactNode } from "react";
import {
  Box,
  Flex,
  StackDivider,
  HStack,
  useMediaQuery,
} from "@chakra-ui/react";
import { MOBILE_MAX_WIDTH } from "constants/constants";

import BackButton from "components/BackButton";

type Props = {
  children: ReactNode;
};

const FormActions: FC<Props> = ({ children }) => {
  const [isMobile] = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH})`);

  return isMobile ? (
    <HStack spacing={4} mb={4}>
      {children}
    </HStack>
  ) : (
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
