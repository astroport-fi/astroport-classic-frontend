import React, { useMemo } from "react";
import { Box, Text, VStack, HStack, AspectRatio } from "@chakra-ui/react";
import dayjs from "dayjs";

import { useFormattedCountdown } from "hooks/useCountdown";

import TimerCircle from "components/TimerCircle";

type Props = {
  start: number;
  end: number;
};

const Timer = ({ start, end }: Props) => {
  const startTime = dayjs.unix(start).valueOf();
  const endTime = dayjs.unix(end)?.valueOf();
  const currentTime = dayjs().valueOf();

  const percent = useMemo(() => {
    const range = endTime - startTime;
    const currentRange = currentTime - startTime;

    return currentRange / range;
  }, [startTime, endTime, currentTime]);

  const countdown = useFormattedCountdown({
    targetTime: endTime,
  });

  if (end == null || start == null) {
    return null;
  }

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
            <TimerCircle percent={percent} />
          </Box>
          <VStack spacing="0">
            <Text
              textTransform="uppercase"
              fontWeight="700"
              fontSize="10px"
              letterSpacing="2px"
              lineHeight="1.2"
            >
              Claim Deadline In
            </Text>
            <Text
              color="brand.turquoise"
              fontSize="46px"
              fontWeight="400"
              lineHeight="1.2"
            >
              {countdown.d}:{countdown.h}:{countdown.m}
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
