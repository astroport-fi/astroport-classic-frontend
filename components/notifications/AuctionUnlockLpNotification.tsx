import React, { FC, useEffect } from "react";
import { TxInfo } from "@terra-money/terra.js";
import { Text } from "@chakra-ui/react";
import num from "libs/num";
import { useQueryClient } from "react-query";
import { getEventsByType, handleTinyAmount } from "modules/common";
import { ONE_TOKEN } from "constants/constants";

type Props = {
  txInfo: TxInfo;
};

const AuctionUnlockLpNotification: FC<Props> = ({ txInfo }) => {
  const queryClient = useQueryClient();
  const eventsByType = getEventsByType(txInfo);
  const amount = eventsByType?.wasm.lp_withdrawn[0];
  const displayAmount = handleTinyAmount(
    num(amount).div(ONE_TOKEN).dp(6).toNumber()
  );

  useEffect(() => {
    queryClient.invalidateQueries("userInfo");
    queryClient.invalidateQueries("balance");
  }, []);

  return (
    <Text textStyle={["small", "medium"]}>
      Unlock {displayAmount} LP tokens from the ASTRO-UST Bootstrap Pool
    </Text>
  );
};

export default AuctionUnlockLpNotification;
