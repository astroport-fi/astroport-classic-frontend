import React, { FC } from "react";
import { Box, Text } from "@chakra-ui/react";

import { useTerra } from "@arthuryeti/terra";
import TokenItem from "components/swap/TokenItem";
import { Token } from "types/common";

type Props = {
  onTokenClick: () => void;
  tokenList?: string[];
};

const TokenList: FC<Props> = ({ onTokenClick, tokenList }) => {
  const { tokens } = useTerra();

  if (tokenList && tokenList.length > 0) {
    return (
      <Box>
        <Box h="xs" overflowY="auto" px="2" mt="2">
          <Box>
            {tokenList.map((token) => {
              return (
                <TokenItem
                  key={token}
                  token={{ token }}
                  onClick={onTokenClick}
                />
              );
            })}
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Text variant="spaced">All whitelisted tokens</Text>
      <Box h="xs" overflowY="auto" px="2" mt="2">
        <Box>
          {Object.values(tokens).map((token: Token) => {
            return (
              <TokenItem
                key={token.token}
                token={token}
                onClick={onTokenClick}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default TokenList;
