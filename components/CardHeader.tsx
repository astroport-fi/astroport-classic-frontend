import React, { FC } from "react";
import { Box, Text, useMediaQuery } from "@chakra-ui/react";
import { MOBILE_MAX_WIDTH } from "constants/constants";

type Props = {
  label: string;
};

const CardHeader: FC<Props> = ({ label }) => {
  const [isMobile] = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH})`);

  return (
    <Box p={isMobile ? "2" : "6"}>
      <Text color="white" fontSize={isMobile ? "md" : "xl"}>
        {label}
      </Text>
    </Box>
  );
};

export default CardHeader;
