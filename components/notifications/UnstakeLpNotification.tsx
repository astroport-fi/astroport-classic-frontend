import React, { FC, useEffect } from "react";
import { TxInfo } from "@terra-money/terra.js";
import { Text } from "@chakra-ui/react";
import { fromTerraAmount } from "@arthuryeti/terra";
import { useQueryClient } from "react-query";

import { useTokenInfo, useAstroswap, getTokenDenoms } from "modules/common";

type Props = {
  txInfo: TxInfo;
  data: any;
};

const UnstakeLpNotification: FC<Props> = ({ txInfo, data }) => {
  const queryClient = useQueryClient();
  const { pairs } = useAstroswap();
  const { getSymbol } = useTokenInfo();
  const { logs } = txInfo;
  const { eventsByType } = logs[0];
  const amount = eventsByType.wasm.amount[2];
  const lpToken = data.token;

  const pair = pairs.find((v) => v.liquidity_token == lpToken);
  const [token1, token2] = getTokenDenoms(pair?.asset_infos);
  const symbol1 = getSymbol(token1);
  const symbol2 = getSymbol(token2);

  useEffect(() => {
    queryClient.invalidateQueries("pools");
    queryClient.invalidateQueries("pool");
    queryClient.invalidateQueries("balance");
  }, []);

  return (
    <Text textStyle={["small", "medium"]}>
      Unstaked {fromTerraAmount(amount, "0,0.00")} {symbol1}-{symbol2}-LP from
      the Generator
    </Text>
  );
};

export default UnstakeLpNotification;
