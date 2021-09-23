import React, { FC, ReactNode } from "react";
import { Box, BoxProps } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  noPadding?: boolean;
} & BoxProps;

const Card: FC<Props> = ({ children, noPadding = false, ...props }) => {
  const py = !noPadding ? "6" : "0";
  const px = !noPadding ? "8" : "0";

  return (
    <Box
      bg="tile.dark"
      py={py}
      px={px}
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
