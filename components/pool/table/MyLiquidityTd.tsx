import React, { FC } from "react";
import { Text } from "@chakra-ui/react";

import { usePool } from "modules/pool";
import { format } from "libs/parse";

type Props = {
  row: any;
};

const MyLiquidityTd: FC<Props> = ({ row }) => {
  const { contract_addr, liquidity_token } = row.original;
  const { myShareInUST } = usePool({
    pairContract: contract_addr,
    lpTokenContract: liquidity_token,
  });

  if (myShareInUST == null) {
    return null;
  }

  return <Text fontSize="sm">{`${format(myShareInUST, "uusd")} UST`}</Text>;
};

export default MyLiquidityTd;
