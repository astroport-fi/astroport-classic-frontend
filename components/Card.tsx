import React, { FC, ReactNode } from "react";
import { Box, BoxProps } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  noPadding?: boolean;
} & BoxProps;

const Card: FC<Props> = ({ children, noPadding = false, ...props }) => {
  return (
    <Box
      bg="tile.dark"
      p={!noPadding && "6"}
      borderRadius="2xl"
      position="relative"
      overflow="hidden"
      color="white"
      {...props}
    >
      {children}
    </Box>
  );
};

export default Card;
