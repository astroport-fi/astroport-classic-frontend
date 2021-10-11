import React, { FC, ReactNode } from "react";
import { Box, Flex, HStack, Text, IconButton, Button } from "@chakra-ui/react";
import { StdFee } from "@terra-money/terra.js";
import { motion } from "framer-motion";

import Card from "components/Card";
import CloseIcon from "components/icons/CloseIcon";
import FormFee from "components/common/FormFee";

type Props = {
  contentComponent: ReactNode;
  details: {
    label: string;
    value: string;
  }[];
  fee?: StdFee | null;
  actionLabel?: string;
  onCloseClick: () => void;
};

const MotionBox = motion(Box);

const FormConfirm: FC<Props> = ({
  actionLabel,
  fee,
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
          <Text fontSize="lg">Confirm</Text>
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

        <Text variant="light" fontSize="xs" mt="6" px="2" lineHeight="1.2">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet.
        </Text>

        <Flex flexDir="column" align="center" mt="8">
          <Button variant="primary" minW="64" size="sm" type="submit">
            {actionLabel}
          </Button>
          {fee && <FormFee fee={fee} />}
        </Flex>
      </Card>
    </MotionBox>
  );
};

export default FormConfirm;
