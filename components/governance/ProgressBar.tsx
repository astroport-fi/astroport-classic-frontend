import React, { FC } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { handleTinyAmount } from "modules/common";

type ProgressElements = {
  voteFor: number;
  voteAgainst: number;
  quorum: number | null;
  height?: number;
};

type BarValues = {
  value: number;
  color: string;
};

type QuorumTipProps = {
  quorum: number;
};

const LeftFixedTip = () => {
  return (
    <>
      <Box
        pos="absolute"
        top="0"
        left="0"
        h="100%"
        width="1px"
        bg="whiteAlpha.200"
      />
      <Text pos="absolute" top="-25px" left="0" color="whiteAlpha.600">
        0%
      </Text>
    </>
  );
};

const RightFixedTip = () => {
  return (
    <>
      <Box
        pos="absolute"
        top="0"
        right="0"
        h="100%"
        width="1px"
        bg="whiteAlpha.200"
      ></Box>
      <Text pos="absolute" top="-25px" right="0" color="whiteAlpha.600">
        100%
      </Text>
    </>
  );
};

const QuorumFixedTip: FC<QuorumTipProps> = ({ quorum }) => {
  const leftPosition = `${quorum}%`;

  return (
    <>
      <Box
        pos="absolute"
        top="-20px"
        left={leftPosition}
        h="30px"
        width="1px"
        bg="whiteAlpha.200"
        zIndex="2"
      ></Box>
      <Flex
        pos="absolute"
        top="-25px"
        left={leftPosition}
        pl="2"
        color="whiteAlpha.600"
        bg="brand.defaultTable"
        zIndex="1"
      >
        <Text>Quorum</Text>
        <Text pl="1" color="white">
          {handleTinyAmount(quorum)}%
        </Text>
      </Flex>
    </>
  );
};

const createBars = (bars: BarValues[]) => {
  let offset = 0;
  let newBars = [] as any[];

  bars.forEach((bar, i) => {
    const roundRight = i === bars.length - 1;
    const roundRightString = roundRight ? "40px 40px" : "0 0";

    newBars.push(
      <Box
        key={i}
        pos="absolute"
        top="0"
        left={`${offset}%`}
        width={`${bar.value}%`}
        bg={bar.color}
        height="100%"
        borderRadius={`0 ${roundRightString} 0`}
      />
    );

    offset += bar.value;
  });

  return newBars;
};

const ProgressBar: FC<ProgressElements> = ({
  voteFor,
  voteAgainst,
  quorum,
  height = 40,
}) => {
  const bars = [
    { value: voteFor, color: "green.500" },
    { value: voteAgainst, color: "red.500" },
  ];

  return (
    <Box pos="relative" width="100%" height={`${height}px`}>
      <LeftFixedTip />
      <RightFixedTip />
      {quorum && <QuorumFixedTip quorum={quorum} />}
      <Box
        pos="relative"
        overflow="hidden"
        bg="blackAlpha.200"
        borderWidth="1px"
        borderColor="whiteAlpha.200"
        mt="10px"
        borderRadius="full"
        width="100%"
        height={`${height - 20}px`}
      >
        {createBars(bars).map((element, i) => (
          <Box key={i}>{element}</Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProgressBar;
