import React, { FC, ReactNode } from "react";
import { Box, Flex, Text, HStack, IconButton } from "@chakra-ui/react";
import { motion } from "framer-motion";

import SuccessIcon from "components/icons/SuccessIcon";
import CloseIcon from "components/icons/CloseIcon";
import Card from "components/Card";

type Props = {
  contentComponent: ReactNode;
  detailsComponent: ReactNode;
  onCloseClick: () => void;
};

const MotionBox = motion(Box);

const FormSuccess: FC<Props> = ({
  contentComponent,
  detailsComponent,
  onCloseClick,
}) => {
  return (
    <MotionBox initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }}>
      <Card>
        <Flex justify="space-between" align="center" mb="6">
          <HStack>
            <SuccessIcon />
            <Text fontSize="2xl" color="green.500">
              Successful
            </Text>
          </HStack>
          <IconButton
            aria-label="Close"
            icon={<CloseIcon />}
            variant="icon"
            onClick={onCloseClick}
          />
        </Flex>

        <Box>{contentComponent}</Box>

        <Text mt="6" mb="1" px="2" variant="light">
          Further Information:
        </Text>
        <Box
          borderWidth="1px"
          borderRadius="xl"
          borderColor="white.200"
          bg="white.100"
          px="4"
          py="4"
        >
          {detailsComponent}
        </Box>
      </Card>
    </MotionBox>
  );
};

export default FormSuccess;
