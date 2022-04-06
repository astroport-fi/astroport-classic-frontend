import React, { FC } from "react";
import { Box, Text } from "@chakra-ui/react";

type Props = {
  label: string;
};

const CardHeader: FC<Props> = ({ label }) => {
  return (
    <Box p="6">
      <Text color="white" fontSize="xl">
        {label}
      </Text>
    </Box>
  );
};

export default CardHeader;
