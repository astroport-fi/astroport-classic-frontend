import React, { FC } from "react";
import { Box, Text, Image, HStack } from "@chakra-ui/react";

import { useTokenInfo } from "modules/common";
import { usePool } from "modules/pool";

type Props = {
  row: any;
};

const PoolItem: FC<Props> = ({ row }) => {
  const { contract_addr, liquidity_token } = row.original;
  const { getIcon, getSymbol } = useTokenInfo();
  const pool = usePool({
    pairContract: contract_addr,
    lpTokenContract: liquidity_token,
  });

  if (pool == null) {
    return null;
  }

  return (
    <HStack>
      <HStack spacing="0.5">
        <Box>
          <Image src={getIcon(pool.token1.asset)} alt="Logo" boxSize="4" />
        </Box>
        <Box>
          <Image src={getIcon(pool.token2.asset)} alt="Logo" boxSize="4" />
        </Box>
      </HStack>
      <Box>
        <Text fontSize="sm">
          {getSymbol(pool.token1.asset)}-{getSymbol(pool.token2.asset)}
        </Text>
      </Box>
    </HStack>
  );
};

export default PoolItem;
