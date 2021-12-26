import React, { FC } from "react";
import { HStack, Text } from "@chakra-ui/react";
import numeral from "numeral";

type Props = {
  value: any;
};

const NumberInUstTd: FC<Props> = ({ value }) => {
  const formatted = numeral(value).format("0,0.00");

  return (
    <HStack>
      <Text fontSize="sm">$ {formatted}</Text>
    </HStack>
  );
};

export default NumberInUstTd;
