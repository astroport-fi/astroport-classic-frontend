import React, { FC, ReactNode } from "react";
import { VStack, Alert, Box, IconButton } from "@chakra-ui/react";

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
        <IconButton
          aria-label="Close"
          icon={<CloseIcon />}
          variant="icon"
          size="xs"
          isRound
        />
      </Alert>
    </VStack>
  );
};

export default Notification;
