import React, { FC } from "react";
import { HStack, Text } from "@chakra-ui/react";
import numeral from "numeral";

type Props = {
  value: any;
  valueInUst?: any;
};

const NumberWithUstTd: FC<Props> = ({ value, valueInUst }) => {
  const formatted = numeral(value).format("0,0.00");
  const formattedInUst = numeral(valueInUst).format("0,0");

  return (
    <HStack>
      <Text fontSize="sm">{formatted}</Text>
      {valueInUst > 0 && (
        <Text fontSize="sm" variant="light">
          ($ {formattedInUst})
        </Text>
      )}
    </HStack>
  );
};

export default NumberWithUstTd;
