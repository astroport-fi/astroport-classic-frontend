import React, { FC } from "react";
import { HStack, Text } from "@chakra-ui/react";

import { handleBigAndTinyAmount } from "modules/common";

type Props = {
  value: any;
  format?: string;
  includeDollarSign?: boolean;
};

const NumberInUstTd: FC<Props> = ({
  value,
  format,
  includeDollarSign = true,
}) => {
  return (
    <HStack>
      <Text fontSize="sm">
        {handleBigAndTinyAmount(value, format, includeDollarSign)}
      </Text>
    </HStack>
  );
};

export default NumberInUstTd;
