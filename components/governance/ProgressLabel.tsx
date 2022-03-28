import React, { FC } from "react";
import { HStack, Flex, Box, Text } from "@chakra-ui/react";
import { handleTinyAmount } from "modules/common";

type LabelElements = {
  voteFor: number;
  voteAgainst: number;
  bubbleSize?: number;
  fontSize?: string;
};

const ProgressLabel: FC<LabelElements> = ({
  voteFor,
  voteAgainst,
  bubbleSize = "12px",
  fontSize = "xs",
}) => {
  return (
    <HStack mt="5" spacing="5" fontSize={fontSize}>
      <Flex align="center">
        <Box w={bubbleSize} h={bubbleSize} borderRadius="50%" bg="green.500" />
        <Text pl="2">{voteFor > 0 ? handleTinyAmount(voteFor) : "0"}%</Text>
        <Text pl="1" color="white.400">
          Votes for
        </Text>
      </Flex>
      <Flex align="center">
        <Box w={bubbleSize} h={bubbleSize} borderRadius="50%" bg="red.500" />
        <Text pl="2">
          {voteAgainst > 0 ? handleTinyAmount(voteAgainst) : "0"}%
        </Text>
        <Text pl="1" color="white.400">
          Votes against
        </Text>
      </Flex>
    </HStack>
  );
};

export default ProgressLabel;
