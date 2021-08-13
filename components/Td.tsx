import React, { FC, ReactNode } from "react";
import { Box, BoxProps } from "@chakra-ui/react";

type Props = {
  children?: ReactNode;
  isRight?: boolean;
} & BoxProps;

const Td: FC<Props> = ({ children, isRight = false, ...props }) => {
  let extraProps = {};

  if (isRight) {
    extraProps = {
      textAlign: "right",
    };
  }

  return (
    <Box flex="1" px="6" {...extraProps} {...props}>
      {children}
    </Box>
  );
};

export default Td;
