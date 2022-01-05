import React, { FC, useEffect } from "react";
import { TxInfo } from "@terra-money/terra.js";
import { Text } from "@chakra-ui/react";
import { fromTerraAmount } from "@arthuryeti/terra";
import { useQueryClient } from "react-query";

import { getTokenDenoms, useAstroswap, useTokenInfo } from "modules/common";

type Props = {
  txInfo: TxInfo;
};

const StakeLpNotification: FC<Props> = ({ txInfo }) => {
  const queryClient = useQueryClient();
  const { getSymbol } = useTokenInfo();
  const { pairs } = useAstroswap();
  const { logs } = txInfo;
  const { eventsByType } = logs[1];
  const amount = eventsByType.wasm.amount[0];
  const lpToken = eventsByType.wasm.contract_address[0];

  const pair = pairs.find((v) => v.liquidity_token == lpToken);
  const [token1, token2] = getTokenDenoms(pair?.asset_infos);
  const symbol1 = getSymbol(token1);
  const symbol2 = getSymbol(token2);

  useEffect(() => {
    queryClient.invalidateQueries("pool");
    queryClient.invalidateQueries("balance");
  }, []);

  return (
    <Text textStyle="medium">
      Stake {fromTerraAmount(amount, "0,0.00")} {symbol1}-{symbol2}-LP
    </Text>
  );
};

export default StakeLpNotification;
