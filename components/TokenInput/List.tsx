import React, { FC } from "react";
import { Box, Text } from "@chakra-ui/react";
import {
  TokenInWallet,
  useBalances,
  useTokenPrices,
  useTokenInfo,
} from "modules/common";
import { ListItem } from "components/TokenInput";

const mapTokenAddressesToWalletInfo = (
  tokens: string[],
  tokensInWallet,
  tokensInUst
): TokenInWallet[] => {
  return tokens.map((address: string) => {
    const balance = tokensInWallet[address] || 0;
    const price = tokensInUst[address] || 0;
    const balanceInUst = balance * price;

    return {
      address,
      balance,
      price,
      balanceInUst,
    };
  });
};

type Props = {
  onClick: (token: string) => void;
  tokens: string[];
  filtered?: boolean;
  filteredTerm?: string;
};

const List: FC<Props> = ({
  tokens,
  onClick,
  filtered = false,
  filteredTerm = "",
}) => {
  const { getSymbol } = useTokenInfo();
  const tokensInUst = useTokenPrices();
  const tokensInWallet = useBalances(tokens);

  const sortByFilterTerm = function (
    data: TokenInWallet[],
    key: string,
    filteredTerm: string
  ) {
    return data.sort(function (a, b) {
      const aIndex = getSymbol(a[key]).toLowerCase().indexOf(filteredTerm);
      const bIndex = getSymbol(b[key]).toLowerCase().indexOf(filteredTerm);
      return aIndex < bIndex ? -1 : 1;
    });
  };

  const sortedTokens = mapTokenAddressesToWalletInfo(
    tokens,
    tokensInWallet,
    tokensInUst
  )
    .sort(
      (tokenA, tokenB) =>
        parseFloat(tokenB.balance) - parseFloat(tokenA.balance)
    )
    .sort((tokenA, tokenB) => tokenB.balanceInUst - tokenA.balanceInUst);
  const sortedTokensByFilterTerm = sortByFilterTerm(
    sortedTokens,
    "address",
    filteredTerm
  );
  const tokenWord = sortedTokens.length === 1 ? "token" : "tokens";

  return (
    <Box>
      {sortedTokensByFilterTerm.length === 0 ? (
        <Text textStyle="minibutton" color="red.500">
          Tokens not found
        </Text>
      ) : (
        <Text textStyle="minibutton">
          {filtered ? `${sortedTokensByFilterTerm.length}` : "all"} {tokenWord}{" "}
          found
        </Text>
      )}
      <Box h={["28", "3xs"]} overflowY="auto" mt="2">
        {sortedTokensByFilterTerm.map((token) => {
          return (
            <ListItem key={token.address} token={token} onClick={onClick} />
          );
        })}
      </Box>
    </Box>
  );
};

export default List;
