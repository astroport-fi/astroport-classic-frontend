import React, { FC, ReactNode } from "react";
import { Flex, BoxProps } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  isHead?: boolean;
} & BoxProps;

const Tr: FC<Props> = ({ children, isHead = false, ...rest }) => {
  let extraProps: any = {
    py: "4",
    px: "6",
    fontWeight: "500",
    align: "center",
    borderBottomWidth: "1px",
    borderBottomColor: "white.200",
    _last: {
      mb: 0,
      // borderBottomWidth: "0px",
    },
  };

  if (isHead) {
    extraProps = {
      fontSize: "sm",
      py: "8",
      px: "6",
      alignItems: "center",
      _notLast: {
        borderBottomWidth: "1px",
        borderBottomColor: "white.200",
      },
    };
  }

  return (
    <Flex
      justify="space-between"
      backgroundColor="inherit"
      {...extraProps}
      {...rest}
    >
      {children}
    </Flex>
  );
};

export default Tr;
