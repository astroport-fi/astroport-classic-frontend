import React, { FC } from "react";
import { Button, ButtonProps } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
} & ButtonProps;

const UnderlineButton: FC<Props> = ({ children, ...props }) => {
  return (
    <Button
      bg="none"
      textDecoration="underline"
      _hover={{ bg: "none" }}
      _active={{ bg: "none" }}
      _focus={{ bg: "none" }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default UnderlineButton;
