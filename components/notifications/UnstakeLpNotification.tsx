import React, { FC, useEffect } from "react";
import { TxInfo } from "@terra-money/terra.js";
import { Text } from "@chakra-ui/react";
import num from "libs/num";
import { useQueryClient } from "react-query";
import {
  useTokenInfo,
  useAstroswap,
  getTokenDenoms,
  handleTinyAmount,
  getEventsByType,
} from "modules/common";
import { orderPoolTokens } from "modules/pool";
import { ONE_TOKEN } from "constants/constants";

type Props = {
  txInfo: TxInfo;
  data: any;
};

const UnstakeLpNotification: FC<Props> = ({ txInfo, data }) => {
  const queryClient = useQueryClient();
  const { pools } = useAstroswap();
  const { getSymbol } = useTokenInfo();
  const eventsByType = getEventsByType(txInfo);
  const amount = eventsByType?.wasm.amount[2];
  const lpToken = data.token;

  const pool = (pools || []).find((p) => p.lp_address == lpToken);
  const assets = getTokenDenoms(pool?.assets || []);
  const [token1, token2] = orderPoolTokens(
    { asset: assets[0] || "", symbol: getSymbol(assets[0] || "") },
    { asset: assets[1] || "", symbol: getSymbol(assets[1] || "") }
  );
  const symbol1 = getSymbol(token1 || "");
  const symbol2 = getSymbol(token2 || "");
  const displayAmount = handleTinyAmount(
    num(amount).div(ONE_TOKEN).dp(6).toNumber(),
    undefined,
    true
  );

  useEffect(() => {
    queryClient.invalidateQueries("pools");
    queryClient.invalidateQueries("pool");
    queryClient.invalidateQueries("balance");
  }, []);

  return (
    <Text textStyle={["small", "medium"]}>
      Unstaked {displayAmount} {symbol1}-{symbol2}-LP from the Generator
    </Text>
  );
};

export default UnstakeLpNotification;
