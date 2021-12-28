import React, { FC } from "react";
import { TxInfo } from "@terra-money/terra.js";
import { Text } from "@chakra-ui/react";
import { fromTerraAmount } from "@arthuryeti/terra";

import { useTokenInfo } from "modules/common";

type Props = {
  txInfo: TxInfo;
  data: any;
};

const SwapNotification: FC<Props> = ({ txInfo, data }) => {
  const { getSymbol } = useTokenInfo();
  const { logs } = txInfo;
  const { eventsByType } = logs[0];
  const { token1, token2 } = data;
  const amount1 = eventsByType.wasm.offer_amount[0];
  const amount2 = eventsByType.wasm.return_amount[0];

  return (
    <Text textStyle="medium">
      Swap {fromTerraAmount(amount1, "0,0.00")} {getSymbol(token1)} for{" "}
      {fromTerraAmount(amount2, "0,0.00")} {getSymbol(token2)}
    </Text>
  );
};

export default SwapNotification;
