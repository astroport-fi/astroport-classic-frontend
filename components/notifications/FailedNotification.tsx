import React, { FC } from "react";
import { TxInfo } from "@terra-money/terra.js";
import { Text } from "@chakra-ui/react";

import { useTokenInfo } from "modules/common";

type Props = {
  txInfo: TxInfo;
};

const FailedNotification: FC<Props> = ({ txInfo }) => {
  const { getSymbol } = useTokenInfo();
  const { raw_log } = txInfo;

  return <Text textStyle={["small", "medium"]}>{raw_log}</Text>;
};

export default FailedNotification;
