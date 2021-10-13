import React, { FC } from "react";
import { Text } from "@chakra-ui/react";
import { fromTerraAmount } from "@arthuryeti/terra";

import { usePool } from "modules/pool";

type Props = {
  row: any;
};

const DepthTd: FC<Props> = ({ row }) => {
  const { contract_addr, liquidity_token } = row.original;
  const pool = usePool({
    pairContract: contract_addr,
    lpTokenContract: liquidity_token,
  });

  if (pool == null || pool.total.shareInUst == null) {
    return null;
  }

  return (
    <Text fontSize="sm">{`${fromTerraAmount(pool.total.shareInUst)} UST`}</Text>
  );
};

export default DepthTd;
