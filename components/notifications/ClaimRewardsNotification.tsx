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
    queryClient.invalidateQueries("balance");
    queryClient.invalidateQueries("rewards");
  }, []);

  return <Text textStyle={["small", "medium"]}>Rewards Claimed</Text>;
};

export default ClaimRewardsNotification;
