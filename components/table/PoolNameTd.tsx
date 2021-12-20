import React, { FC } from "react";
import { Box, HStack, Image, Text } from "@chakra-ui/react";

import { usePool } from "modules/pool";
import { useTokenInfo } from "modules/common";

type Props = {
  row: any;
};

const PoolNameTd: FC<Props> = ({ row }) => {
  console.log(row.original);
  const { getIcon, getSymbol } = useTokenInfo();
  const {
    assets: [token1, token2],
  } = row.original;
  return (
    <HStack>
      <HStack spacing={0.5}>
        <Image src={getIcon(token1)} alt={getSymbol(token1)} boxSize={4} />
        <Image src={getIcon(token2)} alt={getSymbol(token2)} boxSize={4} />
      </HStack>
      <Box>
        <Text textStyle="medium">
          {getSymbol(token1)}-{getSymbol(token2)}
        </Text>
      </Box>
    </HStack>
  );
};

export default PoolNameTd;
