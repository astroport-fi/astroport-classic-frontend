import React, { FC } from "react";
import { HStack, Text } from "@chakra-ui/react";

import { handleBigAndTinyAmount } from "modules/common";

type Props = {
  value: any;
};

const NumberInUstTd: FC<Props> = ({ value }) => {
  return (
    <HStack>
      <Text fontSize="sm">$ {handleBigAndTinyAmount(value)}</Text>
    </HStack>
  );
};

export default NumberInUstTd;
