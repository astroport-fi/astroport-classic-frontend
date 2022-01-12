import React, { FC, useEffect } from "react";
import { TxInfo } from "@terra-money/terra.js";
import { Text } from "@chakra-ui/react";
import { fromTerraAmount } from "@arthuryeti/terra";
import { useQueryClient } from "react-query";

import { useContracts, useTokenInfo } from "modules/common";

type Props = {
  txInfo: TxInfo;
};

const GovStakeNotification: FC<Props> = ({ txInfo }) => {
  const queryClient = useQueryClient();
  const { astroToken, xAstroToken } = useContracts();
  const { getSymbol } = useTokenInfo();
  const { logs } = txInfo;
  const { eventsByType } = logs[0];
  const amount = eventsByType.wasm.amount[0];

  useEffect(() => {
    queryClient.invalidateQueries("balance");
    queryClient.invalidateQueries("supply");
  }, []);

  return (
    <Text textStyle="medium">
      Staked {fromTerraAmount(amount, "0,0.[00]")} {getSymbol(astroToken)} to
      {getSymbol(xAstroToken)}
    </Text>
  );
};

export default GovStakeNotification;
