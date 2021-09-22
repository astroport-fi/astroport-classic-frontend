import React, { FC } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useTerra } from "@arthuryeti/terra";

import { ListItem } from "components/AmountInput";
import { Token } from "types/common";

type Props = {
  onClick: (token: string) => void;
  tokens?: string[];
};

const List: FC<Props> = ({ tokens, onClick }) => {
  const { tokens: terraTokens } = useTerra();

  if (tokens && tokens.length > 0) {
    return (
      <Box>
        <Box h="xs" overflowY="auto" px="2" mt="2">
          <Box>
            {tokens.map((token) => {
              return (
                <ListItem key={token} token={{ token }} onClick={onClick} />
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
          {Object.values(terraTokens).map((token: Token) => {
            return (
              <ListItem key={token.token} token={token} onClick={onClick} />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default List;
