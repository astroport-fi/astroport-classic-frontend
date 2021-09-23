import React, { FC } from "react";
import { Box, Flex, Text, IconButton, Button, HStack } from "@chakra-ui/react";

import CloseIcon from "components/icons/CloseIcon";
import FailedIcon from "components/icons/FailedIcon";
import Card from "components/Card";
import { motion } from "framer-motion";

type Props = {
  swapState: any;
};

const MotionBox = motion(Box);

const SwapFormError: FC<Props> = ({ swapState }) => {
  return (
    <MotionBox
      initial={{ x: 0 }}
      animate={{ x: [10, -10, 3, -3, 0] }}
      transition={{
        duration: 0.3,
      }}
    >
      <Card>
        <Flex justify="space-between" align="center" mb="6">
          <HStack>
            <Box>
              <FailedIcon />
            </Box>
            <Text fontSize="2xl" color="red.500">
              Failed
            </Text>
          </HStack>
          <IconButton
            aria-label="Close"
            icon={<CloseIcon />}
            variant="icon"
            onClick={swapState.resetSwap}
          />
        </Flex>

        <Text variant="light" mt="3">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet.
        </Text>
      </Card>

      <Flex flexDir="column" align="center" mt="6">
        <Button variant="primary" type="button" onClick={swapState.resetSwap}>
          Try Again
        </Button>
      </Flex>
    </MotionBox>
  );
};

export default SwapFormError;
