import { Box, BoxProps } from "@chakra-ui/react";
import { Fee as FeeType } from "@terra-money/terra.js";
import useFeeToString from "hooks/useFeeToString";

type Props = {
  fee?: FeeType | undefined;
} & BoxProps;

const Fee = ({ fee, ...props }: Props) => {
  const feeString = useFeeToString(fee);

  if (!feeString) {
    return null;
  }

  return (
    <Box
      fontSize="sm"
      fontWeight="medium"
      textColor="whiteAlpha.500"
      {...props}
    >
      TX Fee: {feeString}
    </Box>
  );
};

export default Fee;
