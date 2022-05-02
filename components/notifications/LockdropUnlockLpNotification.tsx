import React, { FC, useEffect } from "react";
import { TxInfo } from "@terra-money/terra.js";
import { Text } from "@chakra-ui/react";
import num from "libs/num";
import { useQueryClient } from "react-query";
import {
  getTokenDenoms,
  useAstroswap,
  useTokenInfo,
  handleTinyAmount,
  getEventsByType,
} from "modules/common";
import { orderPoolTokens } from "modules/pool";
import { ONE_TOKEN } from "constants/constants";

type Props = {
  txInfo: TxInfo;
  data: any;
};

const LockdropUnlockLpNotification: FC<Props> = ({ txInfo, data }) => {
  const { pairs } = useAstroswap();
  const queryClient = useQueryClient();
  const { getSymbol } = useTokenInfo();
  const eventsByType = getEventsByType(txInfo);
  const amount = eventsByType?.wasm.astroport_lp_unlocked[0];
  const pair = (pairs || []).find((v) => v.liquidity_token == data.token);
  const assets = getTokenDenoms(pair?.asset_infos || []);
  const [token1, token2] = orderPoolTokens(
    { asset: assets[0] || "", symbol: getSymbol(assets[0] || "") },
    { asset: assets[1] || "", symbol: getSymbol(assets[1] || "") }
  );
  const symbol1 = getSymbol(token1 || "");
  const symbol2 = getSymbol(token2 || "");
  const displayAmount = handleTinyAmount(
    num(amount).div(ONE_TOKEN).dp(6).toNumber()
  );

  useEffect(() => {
    queryClient.invalidateQueries("userInfo");
    queryClient.invalidateQueries("balance");
    queryClient.invalidateQueries("astro-pools");
  }, []);

  return (
    <Text textStyle={["small", "medium"]}>
      Unlock {displayAmount} {symbol1}-{symbol2}-LP tokens
    </Text>
  );
};

export default LockdropUnlockLpNotification;
