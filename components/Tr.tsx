import React, { FC, ReactNode } from "react";
import { Flex } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  isHead?: boolean;
};

const Tr: FC<Props> = ({ children, isHead = false }) => {
  let extraProps: any = {
    py: "6",
    bg: "white.900",
    borderRadius: "2xl",
    mb: "6",
    fontWeight: "500",
    align: "center",
    _last: {
      mb: 0,
    },
  };

  if (isHead) {
    extraProps = {
      fontSize: "sm",
      color: "white.600",
      py: "4",
    };
  }

  return (
    <Flex justify="space-between" {...extraProps}>
      {children}
    </Flex>
  );
};

export default Tr;
