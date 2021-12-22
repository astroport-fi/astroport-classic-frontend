import React, { FC } from "react";
import { Box, HStack, Image, Text } from "@chakra-ui/react";

import { usePool } from "modules/pool";
import { useTokenInfo } from "modules/common";

type Props = {
  assets: [string, string];
};

const PoolNameTd: FC<Props> = ({ assets }) => {
  const { getIcon, getSymbol } = useTokenInfo();
  const [token1, token2] = assets;

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
