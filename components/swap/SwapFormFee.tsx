import { Text } from "@chakra-ui/react";

import { useFeeToString } from "@arthuryeti/terra";

const SwapFormFee = ({ fee }) => {
  const feeString = useFeeToString(fee);

  if (!feeString) {
    return null;
  }

  return (
    <Text variant="light" mt="2" textAlign="center">
      {`TX Fee: ${feeString}`}
    </Text>
  );
};

export default SwapFormFee;
