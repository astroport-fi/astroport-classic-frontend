import React, { FC, useEffect } from "react";
import { TxInfo } from "@terra-money/terra.js";
import { Text } from "@chakra-ui/react";
import { fromTerraAmount } from "@arthuryeti/terra";
import { useQueryClient } from "react-query";

import { useTokenInfo } from "modules/common";

type Props = {
  txInfo: TxInfo;
};

const AuctionUnlockLpNotification: FC<Props> = ({ txInfo }) => {
  const queryClient = useQueryClient();
  const { getSymbol } = useTokenInfo();
  const { logs } = txInfo;
  const { eventsByType } = logs[0];
  const amount = eventsByType.wasm.lp_withdrawn[0];

  useEffect(() => {
    queryClient.invalidateQueries("userInfo");
    queryClient.invalidateQueries("balance");
  }, []);

  return (
    <Text textStyle="medium">
      Unlock {fromTerraAmount(amount, "0,0.00")} LP tokens from the ASTRO-UST
      Bootstrap Pool
    </Text>
  );
};

export default AuctionUnlockLpNotification;
