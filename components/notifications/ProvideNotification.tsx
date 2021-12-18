import React, { FC } from "react";
import { TxInfo } from "@terra-money/terra.js";
import { Text } from "@chakra-ui/react";
import { fromTerraAmount } from "@arthuryeti/terra";

import { useTokenInfo } from "modules/common";

type Props = {
  txInfo: TxInfo;
};

const ProvideNotification: FC<Props> = ({ txInfo }) => {
  const { getSymbol } = useTokenInfo();
  const { logs } = txInfo;
  const { eventsByType } = logs[1];
  const regex = /([0-9]+)(.*)/g;
  // TODO: remove the duplication
  const regex2 = /([0-9]+)(.*)/g;
  const assets = eventsByType.wasm.assets[0].split(",");
  const token1Result = regex.exec(assets[0].trim());
  const token2Result = regex2.exec(assets[1].trim());
  const token1 = token1Result?.[2];
  const amount1 = token1Result?.[1];
  const token2 = token2Result?.[2];
  const amount2 = token2Result?.[1];

  return (
    <Text textStyle="medium">
      Provide {fromTerraAmount(amount1, "0,0.00")} {getSymbol(token1)} and{" "}
      {fromTerraAmount(amount2, "0,0.00")} {getSymbol(token2)}
    </Text>
  );
};

export default ProvideNotification;
