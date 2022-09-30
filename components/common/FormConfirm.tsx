import React, { FC, ReactNode } from "react";
import {
  Box,
  Flex,
  HStack,
  Text,
  IconButton,
  Button,
  VStack,
  Tooltip,
} from "@chakra-ui/react";
import { Fee } from "@terra-money/terra.js";
import { motion } from "framer-motion";
import Card from "components/Card";
import FormFee from "components/common/FormFee";
import InfoIcon from "components/icons/InfoIcon";
import CloseIcon from "components/icons/CloseIcon";

type Props = {
  title?: string;
  titleLarge?: boolean;
  contentComponent: ReactNode;
  details?:
    | {
        label: string;
        value: any;
        tooltip?: string;
        color?: string;
      }[]
    | null;
  fee?: Fee | null | undefined;
  taxEnabled?: boolean;
  txFeeNotEnough?: boolean;
  actionLabel?: string;
  buttonVariant?: string;
  buttonRadius?: string;
  buttonSize?: string;
  maxW?: string;
  onCloseClick: () => void;
};

const MotionBox = motion(Box);

const FormConfirm: FC<Props> = ({
  title,
  titleLarge = false,
  actionLabel,
  buttonVariant = "primary",
  buttonRadius,
  buttonSize = "sm",
  maxW = "470px",
  fee,
  taxEnabled = false,
  txFeeNotEnough = false,
  contentComponent,
  details,
  onCloseClick,
  children,
}) => {
  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      maxW={maxW}
      mx="auto"
      mt={[25, 25, 0]}
      mb={[75, 75, 0]}
    >
      <Card mx="0">
        <Flex justify="space-between" align="center" mb="6">
          {titleLarge && <Text fontSize="lg">{title}</Text>}
          {!titleLarge && <Text textStyle="normal">{title}</Text>}
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
          <VStack mt={6} spacing={[2, 3]} align="stretch">
            <Text textStyle="small" variant="secondary">
              Further information:
            </Text>
            <VStack
              align="stretch"
              color="white"
              borderWidth="1px"
              borderRadius="xl"
              borderColor="white.200"
              bg="white.100"
              px="4"
              py={["3", "4"]}
            >
              {details.map((detail) => (
                <HStack
                  key={detail.label}
                  justify="space-between"
                  alignItems="center"
                >
                  <Box display="flex" alignItems="center">
                    <Text textStyle="small" variant="secondary">
                      {detail.label}
                    </Text>
                    {detail.tooltip && (
                      <Tooltip
                        label={detail.tooltip}
                        placement="top"
                        aria-label="Complete Swap Route"
                      >
                        <Box
                          ml="1.5"
                          color={detail.color || ""}
                          cursor="pointer"
                        >
                          <Text variant="secondary">
                            <InfoIcon width="1rem" height="1rem" />
                          </Text>
                        </Box>
                      </Tooltip>
                    )}
                  </Box>
                  <Text textStyle="medium" color={detail.color ?? "white"}>
                    {detail.value}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </VStack>
        )}

        {children}

        <Flex flexDir="column" align="center" mt="8">
          <Button
            variant={buttonVariant}
            borderRadius={buttonRadius || "full"}
            minW={["32", "64"]}
            size={buttonSize}
            type="submit"
            isDisabled={txFeeNotEnough}
          >
            {actionLabel}
          </Button>
          {fee && (
            <>
              <FormFee fee={fee} />
              {taxEnabled && (
                <Text textStyle="small" variant="dimmed" textAlign="center">
                  {`+ 1.2% Tax`}
                </Text>
              )}
            </>
          )}
        </Flex>
      </Card>
    </MotionBox>
  );
};

export default FormConfirm;
