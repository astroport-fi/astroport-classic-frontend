import React, { FC, useEffect } from "react";
import { TxInfo } from "@terra-money/terra.js";
import { useQueryClient } from "react-query";
import { useTokenInfo } from "modules/common";
import { Text } from "@chakra-ui/react";

type Props = {
  txInfo: TxInfo;
  data: any;
};

const CreatePoolNotification: FC<Props> = ({ data }) => {
  const queryClient = useQueryClient();
  const { getSymbol } = useTokenInfo([data.token1, data.token2]);

  useEffect(() => {
    (async () => {
      await queryClient.invalidateQueries("pools");
      await queryClient.invalidateQueries("pool");
    })();
  });

  return (
    <Text textStyle={["small", "medium"]}>
      Created pool {getSymbol(data.token1)} - {getSymbol(data.token2)}
    </Text>
  );
};

export default CreatePoolNotification;
