import React, { FC } from "react";
import { BoxProps, Circle } from "@chakra-ui/react";

type Props = {
  text: string;
  size?: string;
} & BoxProps;

const ErrorBubble: FC<Props> = ({ text, size = "24px", ...props }) => {
  return (
    <Circle
      background="errors.light"
      borderWidth="1px"
      color="errors.dark"
      borderColor="errors.dark"
      align="center"
      w={size}
      h={size}
      {...props}
    >
      {text}
    </Circle>
  );
};

export default ErrorBubble;
