import React, { FC } from "react";
import { Text } from "@chakra-ui/react";

import { usePool } from "modules/pool";
import { format } from "libs/parse";

type Props = {
  row: any;
};

const MyLiquidityTd: FC<Props> = ({ row }) => {
  const { contract, lpToken } = row.original;
  const { myShareInUST } = usePool({
    pairContract: contract,
    lpTokenContract: lpToken,
  });

  if (myShareInUST == null) {
    return null;
  }

  return <Text fontSize="sm">{`${format(myShareInUST, "uusd")} UST`}</Text>;
};

export default MyLiquidityTd;
