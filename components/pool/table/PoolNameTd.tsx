import React, { FC } from "react";
import { Box, Text, Image, HStack } from "@chakra-ui/react";
import { useTokenInfo } from "@arthuryeti/terra";

import { usePool } from "modules/pool";
import { lookupSymbol } from "libs/parse";

type Props = {
  row: any;
};

const PoolItem: FC<Props> = ({ row }) => {
  const { contract, lpToken } = row.original;
  const { getIcon, getSymbol } = useTokenInfo();
  const { token1, token2 } = usePool({
    pairContract: contract,
    lpTokenContract: lpToken,
  });

  if (token1 == null || token2 == null) {
    return null;
  }

  return (
    <HStack>
      <HStack spacing="0.5">
        <Box>
          <Image src={getIcon(token1)} alt="Logo" boxSize="4" />
        </Box>
        <Box>
          <Image src={getIcon(token2)} alt="Logo" boxSize="4" />
        </Box>
      </HStack>
      <Box>
        <Text fontSize="sm">
          {lookupSymbol(getSymbol(token1))}-{lookupSymbol(getSymbol(token2))}
        </Text>
      </Box>
    </HStack>
  );
};

export default PoolItem;
