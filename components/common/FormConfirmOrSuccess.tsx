import React, { FC, ReactNode } from "react";
import { Box, Flex, HStack, Text, IconButton, Button } from "@chakra-ui/react";
import { StdFee } from "@terra-money/terra.js";
import { motion } from "framer-motion";

import Card from "components/Card";
import CloseIcon from "components/icons/CloseIcon";
import SuccessIcon from "components/icons/SuccessIcon";
import FormFee from "components/common/FormFee";

type Props = {
  contentComponent: ReactNode;
  details: {
    label: string;
    value: string;
  }[];
  fee?: StdFee | null;
  actionLabel?: string;
  isConfirm?: boolean;
  onCloseClick: () => void;
};

const MotionBox = motion(Box);

const FormConfirmOrSuccess: FC<Props> = ({
  actionLabel,
  isConfirm = false,
  fee,
  contentComponent,
  details,
  onCloseClick,
}) => {
  const renderHeader = () => {
    if (isConfirm) {
      return <Text fontSize="2xl">Confirm</Text>;
    }

    return (
      <HStack>
        <SuccessIcon />
        <Text fontSize="2xl" color="green.500">
          Successful
        </Text>
      </HStack>
    );
  };

  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Card>
        <Flex justify="space-between" align="center" mb="6">
          {renderHeader()}
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
          {details.map((detail) => {
            return (
              <HStack key={detail.label} justify="space-between" mb="1">
                <Text fontSize="sm" color="white.600">
                  {detail.label}
                </Text>
                <Text color="white">{detail.value}</Text>
              </HStack>
            );
          })}
        </Box>

        {isConfirm && (
          <>
            <Text variant="light" mt="3" px="2">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet.
            </Text>

            <Flex flexDir="column" align="center" mt="6">
              <Button variant="primary" type="submit">
                {actionLabel}
              </Button>
              {fee && <FormFee fee={fee} />}
            </Flex>
          </>
        )}
      </Card>
    </MotionBox>
  );
};

export default FormConfirmOrSuccess;
