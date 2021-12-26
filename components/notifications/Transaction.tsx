import React, { FC } from "react";
import { Box, HStack, Link, Text, VStack } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

import useFinder from "hooks/useFinder";
import useTimeout from "hooks/useTimeout";

const MotionBox = motion(Box);

type Props = {
  onClose: () => void;
  txHash?: string;
  type?: string;
};

const Transaction: FC<Props> = ({
  onClose,
  txHash,
  type = "succeed",
  children,
}) => {
  const finder = useFinder();
  const [pause, resume] = useTimeout(9000, onClose);

  const icon = {
    succeed: <CheckIcon color="otherColours.green" w={3} />,
    failed: <CloseIcon color="red.500" w={3} />,
  }[type];

  return (
    <MotionBox
      w="sm"
      p={4}
      bg="#333D5F"
      borderWidth="2px"
      borderColor="white.100"
      borderRadius="xl"
      color="white"
      layout
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <HStack align="start" spacing={3}>
        {icon}
        <VStack align="start" flex={1} wordBreak="break-word">
          {children}
          {txHash && (
            <Link href={finder(txHash, "tx")} isExternal>
              <Text textStyle="medium" variant="dimmed">
                View on Terra Finder
              </Text>
            </Link>
          )}
        </VStack>
        <CloseIcon
          aria-label="close"
          cursor="pointer"
          onClick={onClose}
          w={2}
          color="white"
        />
      </HStack>
    </MotionBox>
  );
};

export default Transaction;
