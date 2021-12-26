import React, { FC } from "react";
import numeral from "numeral";
import { Box, Text, Image, HStack } from "@chakra-ui/react";

import { useTokenInfo } from "modules/common";
import { usePool, usePoolFee } from "modules/pool";

type Props = {
  row: any;
};

const PoolItem: FC<Props> = ({ row }) => {
  const { contract_addr, liquidity_token, pair_type } = row.original;
  const { getIcon, getSymbol } = useTokenInfo();
  const pool = usePool({
    pairContract: contract_addr,
    lpTokenContract: liquidity_token,
  });

  if (pool == null) {
    return null;
  }

  return (
    <HStack spacing="3">
      <HStack spacing="1.5">
        <Box>
          <Image src={getIcon(pool.token1.asset)} alt="Logo" boxSize="4" />
        </Box>
        <Box>
          <Image src={getIcon(pool.token2.asset)} alt="Logo" boxSize="4" />
        </Box>
      </HStack>
      <HStack>
        <Text textStyle="medium">
          {getSymbol(pool.token1.asset)}-{getSymbol(pool.token2.asset)}
        </Text>
      </HStack>
    </HStack>
  );
};

export default PoolItem;
