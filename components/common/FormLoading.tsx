import React, { FC } from "react";
import { Box, Flex, Text, Heading, Link } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Lottie from "react-lottie";

import { truncate } from "libs/text";
import * as animationData from "libs/animations/loop.json";
import useFinder from "hooks/useFinder";
import Card from "components/Card";

type Props = {
  txHash?: string;
};

const MotionBox = motion(Box);

const FormLoading: FC<Props> = ({ txHash }) => {
  const finder = useFinder();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Card>
        <Lottie
          options={defaultOptions}
          height={400}
          width={400}
          isStopped={false}
          isPaused={false}
        />

        {txHash == null && (
          <Heading fontSize="xl" fontWeight="500" textAlign="center">
            Waiting for Terra Station...
          </Heading>
        )}

        {txHash != null && (
          <>
            <Heading fontSize="xl" fontWeight="500" textAlign="center">
              Waiting for receipt...
            </Heading>
            <Flex justify="space-between" align="center" mt="12" w="full">
              <Text variant="light" fontSize="md">
                Tx Hash
              </Text>
              <Link
                fontWeight="bold"
                href={finder(txHash, "tx")}
                target="_blank"
              >
                {truncate(txHash)}
              </Link>
            </Flex>
          </>
        )}
      </Card>
    </MotionBox>
  );
};

export default FormLoading;
