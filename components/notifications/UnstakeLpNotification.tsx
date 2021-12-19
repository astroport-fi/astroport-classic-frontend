import React, { FC } from "react";
import { TxInfo } from "@terra-money/terra.js";
import { Text } from "@chakra-ui/react";
import { fromTerraAmount } from "@arthuryeti/terra";

import { useTokenInfo } from "modules/common";

type Props = {
  txInfo: TxInfo;
};

const UnstakeLpNotification: FC<Props> = ({ txInfo }) => {
  const { getLpSymbol } = useTokenInfo();
  const { logs } = txInfo;
  const { eventsByType } = logs[0];
  const amount = eventsByType.wasm.amount[2];
  const lpToken = eventsByType.wasm.contract_address[7];

  return (
    <Text textStyle="medium">
      Unstake {fromTerraAmount(amount, "0,0.00")} {getLpSymbol(lpToken)}
    </Text>
  );
};

export default UnstakeLpNotification;
