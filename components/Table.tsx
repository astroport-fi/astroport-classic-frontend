import React, { FC, ReactNode } from "react";
import { Box } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
};

const Table: FC<Props> = ({ children }) => {
  return (
    <Box
      color="white"
      minWidth={1024}
      backgroundColor="inherit"
      overflow="visible"
    >
      {children}
    </Box>
  );
};

export default Table;
