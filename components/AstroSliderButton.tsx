import React, { FC } from "react";
import { Box, Button, VStack, Text } from "@chakra-ui/react";
import num from "libs/num";

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
    const target = value * (1 / 4) * max;

    if (onClick) {
      onClick(num(target).dp(6).toNumber());
    }
  };

  let alignment, left, right, transform;

  switch (value) {
    case 0:
      alignment = "flex-start";
      left = "0";
      break;
    case 4:
      alignment = "flex-end";
      right = "0";
      break;
    default: {
      const position = Math.round(
        ((max * value * ratioFixed - min) * 100) / (max - min)
      );

      alignment = "center";
      left = `calc(${position}%)`;
      transform = "translateX(-50%)";
    }
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
      <VStack spacing={2} align={alignment}>
        <Box w="6px" h="6px" bg="white" borderRadius="100%" opacity="0.4" />
        <Text textStyle="small" color="white">
          {label}
        </Text>
      </VStack>
    </Button>
  );
};

export default AstroSliderButton;
