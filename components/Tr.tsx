import React, { FC, ReactNode } from "react";
import { Flex } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  isHead?: boolean;
};

const Tr: FC<Props> = ({ children, isHead = false }) => {
  let extraProps: any = {
    py: "4",
    fontWeight: "500",
    align: "center",
    borderBottomWidth: "1px",
    borderBottomColor: "white.200",
    px: "2",
    _last: {
      mb: 0,
    },
  };

  if (isHead) {
    extraProps = {
      borderBottomWidth: "1px",
      borderBottomColor: "white.200",
      fontSize: "sm",
      py: "8",
      px: "2",
    };
  }

  return (
    <Flex justify="space-between" {...extraProps}>
      {children}
    </Flex>
  );
};

export default Tr;
