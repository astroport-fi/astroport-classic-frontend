import React, { FC, useEffect } from "react";
import { TxInfo } from "@terra-money/terra.js";
import { Text } from "@chakra-ui/react";
import num from "libs/num";
import { useQueryClient } from "react-query";
import {
  useTokenInfo,
  handleTinyAmount,
  getEventsByType,
} from "modules/common";

type Props = {
  txInfo: TxInfo;
  data: any;
};

const SwapNotification: FC<Props> = ({ txInfo, data }) => {
  const queryClient = useQueryClient();
  const { getSymbol, getDecimals } = useTokenInfo();
  const eventsByType = getEventsByType(txInfo);
  const { token1, token2 } = data;
  const amount1 = eventsByType?.wasm.offer_amount[0];
  const amount2 =
    eventsByType?.wasm.return_amount[
      eventsByType?.wasm.return_amount.length - 1
    ];
  const token1Decimals = getDecimals(token1);
  const token2Decimals = getDecimals(token2);
  const displayAmount1 = handleTinyAmount(
    num(amount1)
      .div(10 ** token1Decimals)
      .toNumber()
  );
  const displayAmount2 = handleTinyAmount(
    num(amount2)
      .div(10 ** token2Decimals)
      .toNumber()
  );

  useEffect(() => {
    queryClient.invalidateQueries("pool");
    queryClient.invalidateQueries("balance");
  }, []);

  return (
    <Text textStyle={["small", "medium"]}>
      Swap {displayAmount1} {getSymbol(token1)} for {displayAmount2}{" "}
      {getSymbol(token2)}
    </Text>
  );
};

export default SwapNotification;
