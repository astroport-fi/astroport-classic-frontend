import * as React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

interface ProgressElement {
  value: number;
  color: string;
  showPercentage?: boolean;
  textColor?: string;
  fontSize?: number;
}

export type IMultiProgressProps = {
  backgroundColor?: string;
  border?: string;
  elements: ProgressElement[];
  height?: number | string;
  round?: boolean;
  roundLastElement?: boolean;
};

const styles = {
  progressContainer: (
    round: boolean,
    height: string | number,
    border: string
  ) => {
    const convertedHeight = typeof height === "string" ? height : height + "px";
    return {
      width: "100%",
      height: convertedHeight,
    };
  },
  progressBackground: (backgroundColor: string) => ({
    backgroundColor,
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  }),
};

const createElementArray = (elements: ProgressElement[]) => {
  let currentOffset = 0;
  let newElements = [] as any[];

  elements.forEach((element, i) => {
    const roundRight = i === elements.length - 1;
    const roundRightString = roundRight ? "40px 40px" : "0 0";

    newElements.push(
      <Box
        key={i}
        width={`${element.value}%`}
        bg={element.color}
        left={`${currentOffset}%`}
        top="0"
        zIndex="8"
        height="100%"
        position="absolute"
        borderRadius={`0 ${roundRightString} 0`}
      />
    );
    currentOffset += element.value;
  });
  return newElements;
};

const ProgressBar: React.FC<IMultiProgressProps> = ({
  backgroundColor = "#ffffff",
  border = "",
  elements,
  height = "50px",
}) => {
  const convertedHeight = typeof height === "string" ? height : height + "px";

  return (
    <Box position="relative" width="100%" height={height}>
      <Box
        position="absolute"
        h="100%"
        width="1px"
        bg="whiteAlpha.200"
        top="0"
        left="0"
      ></Box>
      <Text position="absolute" top="-25px" left="0" color="whiteAlpha.600">
        0%
      </Text>

      <Box
        position="absolute"
        h="60%"
        width="1px"
        bg="whiteAlpha.200"
        top="-20px"
        left="25%"
      ></Box>
      <Flex
        position="absolute"
        top="-25px"
        left="25%"
        pl="2"
        color="whiteAlpha.600"
      >
        <Text>Quorum</Text>
        <Text pl="1" color="white">
          xx.xx%
        </Text>
      </Flex>

      <Box
        position="absolute"
        h="100%"
        width="1px"
        bg="whiteAlpha.200"
        top="0"
        right="0"
      ></Box>
      <Text position="absolute" top="-25px" right="0" color="whiteAlpha.600">
        100%
      </Text>

      <Box
        position="relative"
        overflow="hidden"
        bg="blackAlpha.200"
        borderWidth="1px"
        borderColor="whiteAlpha.200"
        mt="10px"
        borderRadius="2xl"
        {...styles.progressContainer(true, "30px", border)}
      >
        <Box bg={backgroundColor} />
        {createElementArray(elements).map((element, i) => (
          <Box key={i}>{element}</Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProgressBar;
