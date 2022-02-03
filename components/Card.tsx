import React, { FC, ReactNode } from "react";
import { Box, BoxProps } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  noPadding?: boolean;
} & BoxProps;

const Card: FC<Props> = ({ children, noPadding = false, ...props }) => {
  const py = !noPadding ? ["3", "8"] : "0";
  const px = !noPadding ? ["6", "12"] : "0";

  return (
    <Box
      bg="brand.defaultTable"
      py={py}
      px={px}
      borderWidth="2px"
      borderColor="white.100"
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
