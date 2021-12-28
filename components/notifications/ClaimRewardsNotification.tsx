import React, { FC, useEffect } from "react";
import { TxInfo } from "@terra-money/terra.js";
import { Text } from "@chakra-ui/react";
import { useQueryClient } from "react-query";

import { useTokenInfo } from "modules/common";

type Props = {
  txInfo: TxInfo;
};

const ClaimRewardsNotification: FC<Props> = ({ txInfo }) => {
  const queryClient = useQueryClient();
  const { getSymbol } = useTokenInfo();
  const { logs } = txInfo;
  // const { eventsByType } = logs[1];

  useEffect(() => {
    queryClient.invalidateQueries("userInfo");
  }, []);

  return <Text textStyle="medium">Rewards Claimed</Text>;
};

export default ClaimRewardsNotification;
