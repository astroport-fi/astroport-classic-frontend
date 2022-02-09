import React, { FC } from "react";
import { HStack, Text } from "@chakra-ui/react";

import { handleBigAndTinyAmount, TokenTooltip } from "modules/common";
import TokensPopover from "components/popovers/TokensPopover";

type Props = {
  type?: "totalLiquidity" | "myLiquidity" | null;
  tokenTooltip?: TokenTooltip;
  value: any;
  format?: string;
  includeDollarSign?: boolean;
};

const NumberInUstTd: FC<Props> = ({
  type,
  tokenTooltip,
  value,
  format,
  includeDollarSign = true,
}) => {
  return (
    <TokensPopover type={type} format={format} tokenTooltip={tokenTooltip}>
      <HStack>
        <Text cursor={type && tokenTooltip ? "pointer" : "auto"} fontSize="sm">
          {handleBigAndTinyAmount(value, format, includeDollarSign)}
        </Text>
      </HStack>
    </TokensPopover>
  );
};

export default NumberInUstTd;
