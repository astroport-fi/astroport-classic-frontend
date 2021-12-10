import React, { FC } from "react";
import { Box, HStack, Link, Text, VStack } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import useFinder from "hooks/useFinder";

type Props = {
  onClose: () => void;
  txHash?: string;
  type?: string;
};

const NotificationSuccess: FC<Props> = ({
  onClose,
  txHash,
  type = "success",
  children,
}) => {
  const finder = useFinder();

  const icon = {
    success: <CheckIcon color="otherColours.green" w={3} />,
    error: <CloseIcon color="red.500" w={3} />,
  }[type];

  return (
    <Box
      w="sm"
      px={4}
      py={2}
      bg="#333D5F"
      borderWidth="2px"
      borderColor="white.100"
      borderRadius="xl"
      color="white"
    >
      <HStack align="start" spacing={3}>
        {icon}
        <VStack align="start" flex={1} wordBreak="break-word">
          {children}
          {txHash && (
            <Link href={finder(txHash, "tx")} isExternal>
              <Text textStyle="medium" color="otherColours.overlay">
                View on Terra Finder
              </Text>
            </Link>
          )}
        </VStack>
        <CloseIcon
          aria-label="close"
          cursor="pointer"
          onClick={onClose}
          w={3}
          color="white"
        />
      </HStack>
    </Box>
  );
};

export default NotificationSuccess;
