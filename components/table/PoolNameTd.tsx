import React, { FC } from "react";
import { HStack, Image, Text } from "@chakra-ui/react";
import numeral from "numeral";

import { usePoolFee } from "modules/pool";
import { useTokenInfo } from "modules/common";

type Props = {
  assets: [string, string];
  pairType: string;
};

const PoolNameTd: FC<Props> = ({ assets, pairType }) => {
  const { getIcon, getSymbol } = useTokenInfo();
  const [token1, token2] = assets;
  const fee = usePoolFee(pairType);
  const formattedFee = numeral(fee).divide(100).format("0.00");

  return (
    <HStack>
      <HStack spacing={0.5}>
        <Image src={getIcon(token1)} alt={getSymbol(token1)} boxSize={4} />
        <Image src={getIcon(token2)} alt={getSymbol(token2)} boxSize={4} />
      </HStack>
      <HStack>
        <Text textStyle="medium">
          {getSymbol(token1)}-{getSymbol(token2)}
        </Text>
        <Text textStyle="medium" variant="dimmed">
          ({formattedFee}%)
        </Text>
      </HStack>
    </HStack>
  );
};

export default PoolNameTd;
