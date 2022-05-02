import { Text, TextProps } from "@chakra-ui/react";
import { Fee } from "@terra-money/terra.js";
import useFeeToString from "hooks/useFeeToString";

type Props = {
  fee?: Fee | undefined;
} & TextProps;

const FormFee = ({ fee, ...props }: Props) => {
  const feeString = useFeeToString(fee);

  if (!feeString) {
    return null;
  }

  return (
    <Text
      mt="2"
      textStyle="small"
      variant="dimmed"
      textAlign="center"
      {...props}
    >
      {`TX Fee: ${feeString}`}
    </Text>
  );
};

export default FormFee;
