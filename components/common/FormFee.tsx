import { Text } from "@chakra-ui/react";
import { StdFee } from "@terra-money/terra.js";

import { useFeeToString } from "hooks/useFeeToString";

type Props = {
  fee: StdFee;
};

const FormFee = ({ fee }: Props) => {
  const feeString = useFeeToString(fee);

  if (!feeString) {
    return null;
  }

  return (
    <Text variant="light" color="white" mt="2" textAlign="center">
      {`TX Fee: ${feeString}`}
    </Text>
  );
};

export default FormFee;
