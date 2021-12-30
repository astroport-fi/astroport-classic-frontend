import React, { FC, useEffect } from "react";
import { TxInfo } from "@terra-money/terra.js";
import { Text } from "@chakra-ui/react";
import { fromTerraAmount } from "@arthuryeti/terra";
import { useQueryClient } from "react-query";

import { useContracts, useTokenInfo } from "modules/common";

type Props = {
  txInfo: TxInfo;
};

const GovUnstakeNotification: FC<Props> = ({ txInfo }) => {
  const queryClient = useQueryClient();
  const { xAstroToken } = useContracts();
  const { getSymbol } = useTokenInfo();
  const { logs } = txInfo;
  const { eventsByType } = logs[0];
  const amount = eventsByType.wasm.amount[0];

  useEffect(() => {
    queryClient.invalidateQueries("balance");
  }, []);

  return (
    <Text textStyle="medium">
      Unstake {fromTerraAmount(amount, "0,0.[00]")} {getSymbol(xAstroToken)}{" "}
      from governance
    </Text>
  );
};

export default GovUnstakeNotification;
