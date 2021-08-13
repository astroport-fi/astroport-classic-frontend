import React, { FC, ReactNode } from "react";
import { Box } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
};

const Table: FC<Props> = ({ children }) => {
  return <Box color="white">{children}</Box>;
};

export default Table;
