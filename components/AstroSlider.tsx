import React, { FC } from "react";
import {
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Flex,
  Text,
  SliderProps,
} from "@chakra-ui/react";

import AstroSliderButton from "components/AstroSliderButton";
import SliderHandleIcon from "components/icons/SliderHandleIcon";

type Props = {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  maxAllowed?: number;
  minLabel?: string;
  maxLabel?: string;
  hideButtons?: boolean;
  hasMaxSystem?: boolean;
  isDisabled?: boolean;
} & SliderProps;

const AstroSlider: FC<Props> = ({
  hideButtons = false,
  min,
  max,
  minLabel,
  maxLabel,
  value,
  maxAllowed,
  onChange,
  hasMaxSystem = false,
  isDisabled = false,
  ...props
}) => {
  const renderMaxUnlockableLiquidity = () => {
    if (max != maxAllowed && hasMaxSystem) {
      const ratio = maxAllowed / max;

      return (
        <Box w={(1 - ratio) * 100 + "%"} pb="1">
          <Text color="red.500" mb="2" whiteSpace="nowrap" fontSize="12px">
            Max unlockable liquidity
          </Text>
          <Box position="relative" h="1" mb="3">
            <Box
              position="absolute"
              inset="0"
              w="100%"
              height="100%"
              bg="red.500"
              zIndex={1}
              opacity="0.4"
              borderRadius="lg"
            />
            <Box
              bg="red.500"
              w="4px"
              h="4px"
              borderRadius="4"
              position="absolute"
              left="0"
              top="0"
              zIndex={2}
              transform="translateX(-50%)"
            />
          </Box>
        </Box>
      );
    }
  };

  const renderButtons = () => {
    if (hideButtons) {
      return null;
    }

    const hasLabels = minLabel != null || maxLabel != null;
    const h = hasLabels ? "8" : "3";

    return (
      <Box width="100%" position="relative" mt="2" h={h}>
        {[0, 1, 2, 3, 4].map((value) => {
          return (
            <AstroSliderButton
              key={value}
              value={value}
              label={value == 0 ? minLabel : value == 4 ? maxLabel : null}
              min={min}
              max={max}
              onClick={onChange}
              isDisabled={isDisabled}
            />
          );
        })}
      </Box>
    );
  };

  return (
    <Box>
      <Flex align="flex-end">
        <Box flex="1" position="relative" zIndex={10}>
          <Slider
            variant="brand"
            size="lg"
            min={min}
            max={maxAllowed ?? max}
            value={value}
            step={0.01}
            focusThumbOnChange={false}
            onChange={onChange}
            isDisabled={isDisabled}
            {...props}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb w="6" h="6">
              <SliderHandleIcon
                color="#000D37"
                w="6px"
                h="12px"
                opacity="0.3"
              />
            </SliderThumb>
          </Slider>
        </Box>
        {renderMaxUnlockableLiquidity()}
      </Flex>
      {renderButtons()}
    </Box>
  );
};

export default AstroSlider;
