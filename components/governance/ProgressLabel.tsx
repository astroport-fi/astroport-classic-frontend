import React, { FC } from "react";
import { HStack, Flex, Box, Text } from "@chakra-ui/react";
import { handleAmountWithoutTrailingZeros } from "modules/common";
import { calcVotingDistribution } from "modules/governance/helpers";
import { Proposal } from "types/common";

type LabelElements = {
  proposal: Proposal;
  bubbleSize?: number;
  fontSize?: string;
};

const ProgressLabel: FC<LabelElements> = ({
  proposal,
  bubbleSize = "12px",
  fontSize = "xs",
}) => {
  const { voteForDist, voteAgainstDist } = calcVotingDistribution(proposal);

  return (
    <HStack mt="5" spacing="5" fontSize={fontSize}>
      <Flex align="center">
        <Box
          flexShrink="0"
          w={bubbleSize}
          h={bubbleSize}
          borderRadius="50%"
          bg="green.500"
        />
        <Text pl="2">
          {voteForDist > 0
            ? handleAmountWithoutTrailingZeros(voteForDist)
            : "0"}
          %
        </Text>
        <Text pl="1" color="white.400">
          Votes for
        </Text>
      </Flex>
      <Flex align="center">
        <Box
          flexShrink="0"
          w={bubbleSize}
          h={bubbleSize}
          borderRadius="50%"
          bg="red.500"
        />
        <Text pl="2">
          {voteAgainstDist > 0
            ? handleAmountWithoutTrailingZeros(voteAgainstDist)
            : "0"}
          %
        </Text>
        <Text pl="1" color="white.400">
          Votes against
        </Text>
      </Flex>
    </HStack>
  );
};

export default ProgressLabel;
