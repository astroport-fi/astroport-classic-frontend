import React from "react";
import { Box, Text, VStack, HStack, AspectRatio } from "@chakra-ui/react";

import TimerCircle from "components/TimerCircle";

const Timer = () => {
  return (
    <Box width="230px" mx="auto">
      <AspectRatio ratio={230 / 217} position="relative">
        <Box position="relative" width="100%" height="100%">
          <Box
            position="absolute"
            width="100%"
            height="100%"
            inset="0"
            pointerEvents="none"
          >
            <TimerCircle percent={0.65} />
          </Box>
          <VStack spacing="0">
            <Text
              textTransform="uppercase"
              fontWeight="700"
              fontSize="10px"
              letterSpacing="2px"
              lineHeight="1.2"
            >
              Phase 2 ends in
            </Text>
            <Text
              color="brand.turquoise"
              fontSize="46px"
              fontWeight="400"
              lineHeight="1.2"
            >
              3:23:59
            </Text>
            <HStack
              spacing="2"
              textTransform="uppercase"
              fontWeight="700"
              fontSize="10px"
              letterSpacing="2px"
              opacity="0.4"
              lineHeight="1.2"
            >
              <Text>Days</Text>
              <Text>Hours</Text>
              <Text>Minutes</Text>
            </HStack>
          </VStack>
        </Box>
      </AspectRatio>
    </Box>
  );
};

export default Timer;
