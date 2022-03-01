import React, { FC } from "react";
import { HStack, Image, Text, Link } from "@chakra-ui/react";
import numeral from "numeral";

import useFinder from "hooks/useFinder";
import { usePoolFee, orderPoolTokens } from "modules/pool";
import { useTokenInfo } from "modules/common";

type Props = {
  assets: [string, string];
  pairType: string;
  contract?: string;
};

type TokenComponentProps = {
  token1Icon: string;
  token1Symbol: string;
  token2Icon: string;
  token2Symbol: string;
  formattedFee: string;
};

const TokenComponent: FC<TokenComponentProps> = ({
  token1Icon,
  token1Symbol,
  token2Icon,
  token2Symbol,
}) => {
  return (
    <HStack spacing={2}>
      <HStack spacing={1}>
        <Image src={token1Icon} alt={token1Symbol} boxSize={3} />
        <Image src={token2Icon} alt={token2Symbol} boxSize={3} />
      </HStack>
      <HStack>
        <Text textStyle="medium">
          {token1Symbol} - {token2Symbol}
        </Text>
      </HStack>
    </HStack>
  );
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
      token1Icon={getIcon(token1)}
      token1Symbol={getSymbol(token1)}
      token2Icon={getIcon(token2)}
      token2Symbol={getSymbol(token2)}
      formattedFee={formattedFee}
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
