import React, { FC, ReactNode } from "react";
import { Box, BoxProps } from "@chakra-ui/react";

const DEFAULT_GRADIENT =
  "linear-gradient(180deg, rgb(173, 163, 255) 0%, rgb(86, 67, 242) 100%)";

type Props = {
  children: ReactNode;
  gradient?: string;
} & BoxProps;

const BoxGradient: FC<Props> = ({
  children,
  gradient = DEFAULT_GRADIENT,
  ...props
}) => {
  return (
    <Box backgroundImage={gradient} padding="0.5" borderRadius="xl" {...props}>
      <Box bg="brand.deepBlue" borderRadius="xl">
        {children}
      </Box>
    </Box>
  );
};

export default BoxGradient;
