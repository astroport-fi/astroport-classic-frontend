import React, { FC } from "react";
import { HStack, Text, Link } from "@chakra-ui/react";
import numeral from "numeral";

import useFinder from "hooks/useFinder";
import { usePoolFee, orderPoolTokens } from "modules/pool";
import { useTokenInfo } from "modules/common";

import TokenComponent from "components/common/TokenComponent";

type Props = {
  assets: [string, string];
  pairType: string;
  contract?: string;
};

const PoolNameTd: FC<Props> = ({ assets, pairType, contract }) => {
  const finder = useFinder();
  const { getIcon, getSymbol } = useTokenInfo();
  const [token1, token2] = orderPoolTokens(
    { asset: assets[0], symbol: getSymbol(assets[0]) },
    { asset: assets[1], symbol: getSymbol(assets[1]) }
  );
  const fee = usePoolFee(pairType);
  const formattedFee = numeral(fee).divide(100).format("0.00");

  const Token = (
    <TokenComponent
      token1Icon={getIcon(token1 || "")}
      token1Symbol={getSymbol(token1 || "")}
      token2Icon={getIcon(token2 || "")}
      token2Symbol={getSymbol(token2 || "")}
    />
  );

  return (
    <HStack spacing={2}>
      {contract && (
        <Link href={finder(contract, "address")} isExternal>
          {Token}
        </Link>
      )}
      {!contract && <>{Token}</>}
      <Text textStyle="medium" variant="dimmed">
        ({formattedFee}% fee)
      </Text>
    </HStack>
  );
};

export default PoolNameTd;
