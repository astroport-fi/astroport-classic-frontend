import React, { FC, useEffect } from "react";
import { TxInfo } from "@terra-money/terra.js";
import { Text } from "@chakra-ui/react";
import { num } from "@arthuryeti/terra";
import { useQueryClient } from "react-query";

import { useContracts, useTokenInfo, handleTinyAmount } from "modules/common";
import { ONE_TOKEN } from "constants/constants";

type Props = {
  txInfo: TxInfo;
};

const GovUnstakeNotification: FC<Props> = ({ txInfo }) => {
  const queryClient = useQueryClient();
  const { astroToken, xAstroToken } = useContracts();
  const { getSymbol } = useTokenInfo();
  const { logs } = txInfo;
  const { eventsByType } = logs[0];
  const amount = eventsByType.wasm.amount[0];
  const displayAmount = handleTinyAmount(
    num(amount).div(ONE_TOKEN).dp(6).toNumber()
  );

  useEffect(() => {
    queryClient.invalidateQueries("balance");
    queryClient.invalidateQueries("supply");
  }, []);

  return (
    <Text textStyle={["small", "medium"]}>
      Unstaked {displayAmount} {getSymbol(astroToken)} from{" "}
      {getSymbol(xAstroToken)}
    </Text>
  );
};

export default GovUnstakeNotification;
