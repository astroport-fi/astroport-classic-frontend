import React, { FC } from "react";
import { Text } from "@chakra-ui/react";

import { usePool } from "modules/pool";
import { format } from "libs/parse";

type Props = {
  row: any;
};

const DepthTd: FC<Props> = ({ row }) => {
  const { contract_addr, liquidity_token } = row.original;
  const { totalShareInUST } = usePool({
    pairContract: contract_addr,
    lpTokenContract: liquidity_token,
  });

  if (totalShareInUST == null) {
    return null;
  }

  return <Text fontSize="sm">{`${format(totalShareInUST, "uusd")} UST`}</Text>;
};

export default DepthTd;
