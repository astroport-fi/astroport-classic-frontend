import React, { FC } from "react";
import { TxInfo } from "@terra-money/terra.js";
import { Text } from "@chakra-ui/react";
import { fromTerraAmount } from "@arthuryeti/terra";

import { useTokenInfo } from "modules/common";

type Props = {
  txInfo: TxInfo;
};

const ClaimRewardsNotification: FC<Props> = ({ txInfo }) => {
  const { getSymbol } = useTokenInfo();
  const { logs } = txInfo;
  const { eventsByType } = logs[1];

  console.log("logs", logs);

  return <Text textStyle="medium">Rewards Claimed</Text>;
};

export default ClaimRewardsNotification;
