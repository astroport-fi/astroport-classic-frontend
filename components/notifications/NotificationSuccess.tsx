import React, { FC } from "react";
import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

type Props = {
  onClose: () => void;
};

const NotificationSuccess: FC<Props> = ({ onClose, children }) => {
  return (
    <Box
      p={2}
      bg="#333D5F"
      borderWidth="2px"
      borderColor="white.100"
      borderRadius="xl"
      color="white"
    >
      <Flex justify="space-between" align="start">
        <HStack align="start">
          <CheckIcon color="otherColours.green" w={3} h={3} />
          <VStack align="start">{children}</VStack>
        </HStack>
        <CloseIcon
          aria-label="close"
          cursor="pointer"
          onClick={onClose}
          w={2}
          h={2}
          color="white"
        />
      </Flex>
    </Box>
  );
};

export default NotificationSuccess;
