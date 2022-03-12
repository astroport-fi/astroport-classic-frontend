import React, { FC } from "react";
import { Circle } from "@chakra-ui/react";

type Props = {
  text: string;
};

const ErrorBubble: FC<Props> = ({ text }) => {
  return (
    <Circle
      position="absolute"
      top="60px"
      right="48px"
      background="errors.light"
      borderWidth="1px"
      color="errors.dark"
      borderColor="errors.dark"
      w="24px"
      h="24px"
      align="center"
    >
      {text}
    </Circle>
  );
};

export default ErrorBubble;
