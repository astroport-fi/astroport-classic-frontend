import React, { FC, ReactNode } from "react";
import { Box, Flex, HStack, Text, IconButton } from "@chakra-ui/react";
import { motion } from "framer-motion";

import Card from "components/Card";
import CloseIcon from "components/icons/CloseIcon";
import SuccessIcon from "components/icons/SuccessIcon";

type Props = {
  contentComponent: ReactNode;
  details: {
    label: string;
    value: string;
  }[];
  onCloseClick: () => void;
};

const MotionBox = motion(Box);

const FormSuccess: FC<Props> = ({
  contentComponent,
  details,
  onCloseClick,
}) => {
  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      w="470px"
      m="0 auto"
      mt="10"
    >
      <Card>
        <Flex justify="space-between" align="center" mb="6">
          <HStack>
            <SuccessIcon />
            <Text color="green.500">Successful</Text>
          </HStack>
          <IconButton
            aria-label="Close"
            icon={<CloseIcon />}
            variant="icon"
            onClick={onCloseClick}
          />
        </Flex>

        <Box>{contentComponent}</Box>

        <Text mt="6" mb="1" textStyle="small" variant="secondary">
          Breakdown:
        </Text>
        <Box
          color="white"
          borderWidth="1px"
          borderRadius="xl"
          borderColor="white.200"
          bg="white.100"
          px="4"
          py="4"
        >
          {details.map((detail) => {
            return (
              <HStack key={detail.label} justify="space-between" mb="1">
                <Text textStyle="small" variant="secondary">
                  {detail.label}
                </Text>
                <Text textStyle="medium">{detail.value}</Text>
              </HStack>
            );
          })}
        </Box>
      </Card>
    </MotionBox>
  );
};

export default FormSuccess;
