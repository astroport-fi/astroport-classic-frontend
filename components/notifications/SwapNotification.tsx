import React, { FC, useEffect } from "react";
import { TxInfo } from "@terra-money/terra.js";
import { Text } from "@chakra-ui/react";
import { fromTerraAmount, num } from "@arthuryeti/terra";
import { useQueryClient } from "react-query";

import { useTokenInfo } from "modules/common";

type Props = {
  txInfo: TxInfo;
  data: any;
};

const SwapNotification: FC<Props> = ({ txInfo, data }) => {
  const queryClient = useQueryClient();
  const { getSymbol, getDecimals } = useTokenInfo();
  const { logs } = txInfo;
  const { eventsByType } = logs[0];
  const { token1, token2 } = data;
  const amount1 = eventsByType.wasm.offer_amount[0];
  const amount2 = eventsByType.wasm.return_amount[0];
  const token1Decimals = getDecimals(token1);
  const token2Decimals = getDecimals(token2);
  const decimals = Math.max(token1Decimals, token2Decimals);
  const displayAmount1 = num(amount1)
    .div(10 ** decimals)
    .toFixed(2);
  const displayAmount2 = num(amount2)
    .div(10 ** decimals)
    .toFixed(2);

  useEffect(() => {
    queryClient.invalidateQueries("pool");
    queryClient.invalidateQueries("balance");
  }, []);

  return (
    <Text textStyle="medium">
      Swap {displayAmount1} {getSymbol(token1)} for {displayAmount2}{" "}
      {getSymbol(token2)}
    </Text>
  );
};

export default SwapNotification;
