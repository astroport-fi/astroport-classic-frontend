import React, { FC } from "react";
import { Box, Text } from "@chakra-ui/react";

const SwapFormWarning: FC = () => (
  <Box
    bg="whiteAlpha.50"
    color="white"
    px={12}
    pt={4}
    pb={5}
    borderRadius="2xl"
    borderWidth={2}
    borderColor="red.300"
    mt={4}
  >
    <Text display="inline" color="red.500" textStyle="small">
      Warning:{" "}
    </Text>
    <Text display="inline" textStyle="small" variant="secondary">
      The numbers above are estimates and could change based on network activity
      between the time you submit your transaction and the time it completes.
    </Text>
  </Box>
);

export default SwapFormWarning;
