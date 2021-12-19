import React, { FC } from "react";
import { Text, Box, Flex, Spinner, HStack } from "@chakra-ui/react";

import { Notification } from "modules/common";

type Props = {
  items: Notification[];
};

const PendingNotifications: FC<Props> = ({ items = [] }) => {
  return (
    <Box color="white" bg="#333D5F" py="2" px="4" borderRadius="full">
      <HStack>
        <Spinner size="xs" />
        <Text fontWeight="bold" fontSize="sm" px="12" whiteSpace="nowrap">
          {items.length} Pending Transactions ...
        </Text>
      </HStack>
    </Box>
  );
};

export default PendingNotifications;
