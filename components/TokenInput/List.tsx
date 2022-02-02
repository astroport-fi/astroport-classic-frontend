import React, { FC } from "react";
import { Box, Text } from "@chakra-ui/react";
import { TokenInWallet, useWalletInfo, useTokenPrices } from "modules/common";
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
};

const List: FC<Props> = ({ tokens, onClick, filtered = false }) => {
  const tokensInUst = useTokenPrices();
  const tokensInWallet = useWalletInfo(tokens);
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
  const tokenWord = sortedTokens.length === 1 ? "token" : "tokens";

  return (
    <Box>
      {sortedTokens.length === 0 ? (
        <Text textStyle="minibutton" color="red.500">
          Tokens not found
        </Text>
      ) : (
        <Text textStyle="minibutton">
          {filtered ? `${sortedTokens.length}` : "all"} {tokenWord} found
        </Text>
      )}
      <Box h={["28", "3xs"]} overflowY="auto" mt="2">
        {sortedTokens.map((token) => {
          return (
            <ListItem key={token.address} token={token} onClick={onClick} />
          );
        })}
      </Box>
    </Box>
  );
};

export default List;
