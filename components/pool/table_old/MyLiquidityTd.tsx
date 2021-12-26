import React, { FC } from "react";
import { Text } from "@chakra-ui/react";
import { fromTerraAmount } from "@arthuryeti/terra";

import { usePool } from "modules/pool";

type Props = {
  row: any;
};

const MyLiquidityTd: FC<Props> = ({ row }) => {
  const { contract_addr, liquidity_token } = row.original;
  const pool = usePool({
    pairContract: contract_addr,
    lpTokenContract: liquidity_token,
  });

  if (pool == null || pool.mine.shareInUst == null) {
    return <Text fontSize="sm">xxxx</Text>;
  }

  return <Text fontSize="sm">{`${pool.mine.shareInUst} UST`}</Text>;
};

export default MyLiquidityTd;
