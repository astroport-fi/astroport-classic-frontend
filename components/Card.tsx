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
      py={!noPadding && "6"}
      px={!noPadding && "8"}
      border="2px solid rgba(86, 67, 242, 0.4)"
      borderRadius="2xl"
      position="relative"
      color="white"
      {...props}
    >
      {children}
    </Box>
  );
};

export default Card;
