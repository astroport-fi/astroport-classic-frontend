import React, { FC, ReactNode } from "react";
import {
  Box,
  Flex,
  HStack,
  Text,
  IconButton,
  Button,
  VStack,
} from "@chakra-ui/react";
import { Fee } from "@terra-money/terra.js";
import { motion } from "framer-motion";

import Card from "components/Card";
import FormFee from "components/common/FormFee";
import CloseIcon from "components/icons/CloseIcon";

type Props = {
  title?: string;
  contentComponent: ReactNode;
  details?: {
    label: string;
    value: string;
  }[];
  fee?: Fee | null;
  actionLabel?: string;
  onCloseClick: () => void;
};

const MotionBox = motion(Box);

const FormConfirm: FC<Props> = ({
  title,
  actionLabel,
  fee,
  contentComponent,
  details,
  onCloseClick,
  children,
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
          <Text>{title}</Text>
          <IconButton
            aria-label="Close"
            variant="simple"
            isRound
            _hover={{
              bg: "rgba(255,255,255,0.1)",
            }}
            icon={<CloseIcon w="6" h="6" color="white" BackgroundOpacity="0" />}
            onClick={onCloseClick}
          />
        </Flex>

        <Box>{contentComponent}</Box>

        {details && (
          <VStack mt={6} spacing={3} align="stretch">
            <Text textStyle="small" variant="secondary">
              Breakdown
            </Text>
            <VStack
              align="stretch"
              color="white"
              borderWidth="1px"
              borderRadius="xl"
              borderColor="white.200"
              bg="white.100"
              px="4"
              py="4"
            >
              {details.map((detail) => (
                <HStack key={detail.label} justify="space-between">
                  <Text textStyle="small" variant="secondary">
                    {detail.label}
                  </Text>
                  <Text
                    textStyle="medium"
                    color={
                      detail.label == "Price Impact" ? "green.500" : "inherit"
                    }
                  >
                    {detail.value}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </VStack>
        )}

        {children}

        <Flex flexDir="column" align="center" mt="8">
          <Button variant="primary" minW="64" size="sm" type="submit">
            {actionLabel}
          </Button>
          {fee && <FormFee fee={fee} opacity={1} />}
        </Flex>
      </Card>
    </MotionBox>
  );
};

export default FormConfirm;
