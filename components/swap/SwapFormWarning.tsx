import React, { FC, ReactNode } from "react";
import { Box, Text, BoxProps } from "@chakra-ui/react";

type Props = {
  children?: ReactNode;
} & BoxProps;

const SwapFormWarning: FC<Props> = ({ children, ...props }) => (
  <Box
    bg="whiteAlpha.50"
    color="white"
    px={["4", "8", "12"]}
    pt={4}
    pb={5}
    borderRadius="2xl"
    borderWidth={2}
    borderColor="red.300"
    mt={4}
    {...props}
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
