import React, { FC, useEffect } from "react";
import { TxInfo } from "@terra-money/terra.js";
import { Text } from "@chakra-ui/react";
import { num } from "@arthuryeti/terra";
import { useQueryClient } from "react-query";

import { useTokenInfo } from "modules/common";

type Props = {
  txInfo: TxInfo;
};

const WithdrawNotification: FC<Props> = ({ txInfo }) => {
  const queryClient = useQueryClient();
  const { getSymbol, getDecimals } = useTokenInfo();
  const { logs } = txInfo;
  const { eventsByType } = logs[0];
  const regex = /([0-9]+)(.*)/g;
  //TODO: remove the duplication
  const regex2 = /([0-9]+)(.*)/g;
  const assets = eventsByType.wasm.refund_assets[0].split(",");
  const token1Result = regex.exec(assets[0].trim());
  const token2Result = regex2.exec(assets[1].trim());
  const token1 = token1Result?.[2];
  const amount1 = token1Result?.[1];
  const token2 = token2Result?.[2];
  const amount2 = token2Result?.[1];
  const token1Decimals = getDecimals(token1);
  const token2Decimals = getDecimals(token2);
  const displayAmount1 = num(amount1)
    .div(10 ** token1Decimals)
    .toFixed(2);
  const displayAmount2 = num(amount2)
    .div(10 ** token2Decimals)
    .toFixed(2);

  useEffect(() => {
    queryClient.invalidateQueries("pools");
    queryClient.invalidateQueries("pool");
    queryClient.invalidateQueries("balance");
  }, []);

  return (
    <Text textStyle={["small", "medium"]}>
      Withdraw {displayAmount1} {getSymbol(token1)} and {displayAmount2}{" "}
      {getSymbol(token2)}
    </Text>
  );
};

export default WithdrawNotification;
