import React, { FC } from "react";
import { Box, Button, VStack, Text } from "@chakra-ui/react";

type Props = {
  value: number;
  min: number;
  max: number;
  onClick: (value: number) => void;
  label?: string;
  isDisabled?: boolean;
};

const AstroSliderButton: FC<Props> = ({
  value,
  min,
  max,
  onClick,
  label,
  isDisabled,
}) => {
  const ratio = 1 / 4;
  const ratioFixed = parseFloat(ratio.toFixed(2));

  const handleClick = () => {
    const target = Math.round(value * (1 / 4) * max);

    if (onClick) {
      onClick(target);
    }
  };

  const aligment = value === 4 ? "flex-end" : "left";
  const position = Math.round(
    ((max * value * ratioFixed - min) * 100) / (max - min)
  );
  let left = `calc(${position}%)`;
  let right = "0";
  let transform = "translateX(-50%)";

  if (value === 0) {
    left = "0";
    transform = "0";
  }

  if (value === 4) {
    left = "auto";
    transform = "0";
    right = "0";
  }

  return (
    <Button
      variant="slider"
      position="absolute"
      left={left}
      right={right}
      transform={transform}
      onClick={handleClick}
      isDisabled={isDisabled}
    >
      <VStack spacing={2} align={aligment}>
        <Box w="6px" h="6px" bg="white" borderRadius="100%" opacity="0.4" />
        <Text textStyle="small" color="white">
          {label}
        </Text>
      </VStack>
    </Button>
  );
};

export default AstroSliderButton;
