import React, { FC } from "react";

import {
  Box,
  Flex,
  HStack,
  Slider as ChakraSlider,
  SliderProps,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  VStack,
} from "@chakra-ui/react";

type Props = {} & SliderProps;

const Slider: FC<Props> = ({ ...props }) => {
  const labels = ["0%", "25%", "50%", "75%", "Max"];

  return (
    <Box>
      <ChakraSlider {...props}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb boxSize={6}>
          <HStack spacing={1}>
            <Box width="1px" height="12px" bg="brand.deepBlue"></Box>
            <Box width="1px" height="12px" bg="brand.deepBlue"></Box>
          </HStack>
        </SliderThumb>
      </ChakraSlider>
      <Flex justify="space-between">
        {labels.map((label, index) => {
          const alignment =
            {
              0: "start",
              [labels.length - 1]: "end",
            }[index] || "center";
          return (
            <VStack key={label} spacing={3}>
              <Box
                width="6px"
                height="6px"
                borderRadius="full"
                bg="white"
                opacity="0.5"
                alignSelf={alignment}
              />
              <Text textStyle="small" variant="secondary" alignSelf={alignment}>
                {label}
              </Text>
            </VStack>
          );
        })}
      </Flex>
    </Box>
  );
};

export default Slider;
