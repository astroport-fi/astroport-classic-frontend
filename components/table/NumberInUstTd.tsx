import React, { FC } from "react";
import { HStack, Text } from "@chakra-ui/react";

import { handleBigAndTinyAmount } from "modules/common";

type Props = {
  value: any;
  format?: string;
};

const NumberInUstTd: FC<Props> = ({ value, format }) => {
  return (
    <HStack>
      <Text fontSize="sm">$ {handleBigAndTinyAmount(value, format)}</Text>
    </HStack>
  );
};

export default NumberInUstTd;
