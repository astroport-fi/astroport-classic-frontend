import React, { FC, ReactNode } from "react";
import { VStack, Alert, Box, Button } from "@chakra-ui/react";

import CloseIcon from "components/icons/CloseIcon";

type Props = {
  children: ReactNode;
  variant?: any;
};

const Notification: FC<Props> = ({ children, variant = "info" }) => {
  return (
    <VStack spacing="6">
      <Alert status={variant}>
        <Box flex="1">{children}</Box>
        <Button variant="icon">
          <CloseIcon color="white" w="6" h="6" />
        </Button>
      </Alert>
    </VStack>
  );
};

export default Notification;
