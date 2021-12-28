import React, { FC } from "react";
import { HStack, Image, Text } from "@chakra-ui/react";
import numeral from "numeral";

import { usePoolFee, orderPoolTokens } from "modules/pool";
import { useTokenInfo } from "modules/common";

type Props = {
  assets: [string, string];
  pairType: string;
};

const PoolNameTd: FC<Props> = ({ assets, pairType }) => {
  const { getIcon, getSymbol } = useTokenInfo();
  const [token1, token2] = orderPoolTokens({asset: assets[0], symbol: getSymbol(assets[0])}, {asset: assets[1], symbol: getSymbol(assets[1])});
  const fee = usePoolFee(pairType);
  const formattedFee = numeral(fee).divide(100).format("0.00");

  return (
    <HStack spacing={2}>
      <HStack spacing={1}>
      <Image src={getIcon(token1)} alt={getSymbol(token1)} boxSize={3} />
      <Image src={getIcon(token2)} alt={getSymbol(token2)} boxSize={3} />
      </HStack>
      <HStack>
        <Text textStyle="medium">{getSymbol(token1)} - {getSymbol(token2)}</Text>
        <Text textStyle="medium" variant="dimmed">
          ({formattedFee}% fee)
        </Text>
      </HStack>
    </HStack>
  );
};

export default PoolNameTd;
