import React, { FC, ReactNode } from "react";
import { Box, HStack, VStack } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

import useTimeout from "hooks/useTimeout";

const MotionBox = motion(Box);

type Props = {
  onClose: () => void;
  type?: string;
  children?: ReactNode;
};

const Toast: FC<Props> = ({ onClose, type = "success", children }) => {
  const [pause, resume] = useTimeout(100000, onClose);

  const icon = {
    success: <CheckIcon color="otherColours.green" w={3} />,
    error: <CloseIcon color="red.500" w={3} />,
  }[type];

  return (
    <MotionBox
      w={["2xs", "sm"]}
      px={["2", "4"]}
      py={4}
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

export default Toast;
