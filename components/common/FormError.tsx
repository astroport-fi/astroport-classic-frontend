import React, { FC } from "react";
import { Box, Flex, Text, IconButton, Button, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

import CloseIcon from "components/icons/CloseIcon";
import FailedIcon from "components/icons/FailedIcon";
import Card from "components/Card";

type Props = {
  label?: string;
  content: string;
  onClick: () => void;
  onCloseClick: () => void;
};

const MotionBox = motion(Box);

const FormError: FC<Props> = ({
  label = "Try Again",
  content,
  onClick,
  onCloseClick,
}) => {
  return (
    <MotionBox
      initial={{ x: 0 }}
      animate={{ x: [10, -10, 3, -3, 0] }}
      transition={{
        duration: 0.3,
      }}
      w="470px"
      m="0 auto"
      mt="10"
    >
      <Card>
        <Flex justify="space-between" align="center" mb="6">
          <HStack>
            <Box>
              <FailedIcon />
            </Box>
            <Text fontSize="lg" color="red.500">
              Failed
            </Text>
          </HStack>
          <IconButton
            aria-label="Close"
            icon={<CloseIcon />}
            variant="icon"
            onClick={onCloseClick}
          />
        </Flex>

        <Text variant="light" mt="3">
          {content}
        </Text>

        <Flex flexDir="column" align="center" mt="8">
          <Button variant="primary" size="sm" type="button" onClick={onClick}>
            {label}
          </Button>
        </Flex>
      </Card>
    </MotionBox>
  );
};

export default FormError;
