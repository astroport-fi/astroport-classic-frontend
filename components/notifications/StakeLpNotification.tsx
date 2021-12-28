import React, { FC, useEffect } from "react";
import { TxInfo } from "@terra-money/terra.js";
import { Text } from "@chakra-ui/react";
import { fromTerraAmount } from "@arthuryeti/terra";
import { useQueryClient } from "react-query";
import { getTokenDenoms, useAstroswap, useTokenInfo } from "modules/common";
import { orderPoolTokens } from "modules/pool";

type Props = {
  txInfo: TxInfo;
  data: any;
};

const StakeLpNotification: FC<Props> = ({ txInfo, data }) => {
  const queryClient = useQueryClient();
  const { getSymbol } = useTokenInfo();
  const { pairs } = useAstroswap();
  const { logs } = txInfo;
  const { eventsByType } = logs[1];
  const amount = eventsByType.wasm.amount[0];
  const lpToken = eventsByType.wasm.contract_address[0];

  const pair = pairs.find((v) => v.liquidity_token == lpToken);
  const assets = getTokenDenoms(pair?.asset_infos);
  const [token1, token2] = orderPoolTokens({asset: assets[0], symbol: getSymbol(assets[0])}, {asset: assets[1], symbol: getSymbol(assets[1])});
  const symbol1 = getSymbol(token1);
  const symbol2 = getSymbol(token2);

  useEffect(() => {
    queryClient.invalidateQueries("pools");
    queryClient.invalidateQueries("pool");
    queryClient.invalidateQueries("balance");
  }, []);

  return (
    <Text textStyle={["small", "medium"]}>
      Staked {fromTerraAmount(amount, "0,0.00")} {symbol1}-{symbol2}-LP in the
      Generator
    </Text>
  );
};

export default StakeLpNotification;
