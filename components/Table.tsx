import React, { FC, ReactNode } from "react";
import { Box } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  minW?: string;
};

const Table: FC<Props> = ({ children, minW = "1180px" }) => {
  return (
    <Box color="white" minW={minW} backgroundColor="inherit" overflow="visible">
      {children}
    </Box>
  );
};

export default Table;
