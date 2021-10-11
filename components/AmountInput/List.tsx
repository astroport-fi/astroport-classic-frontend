import React, { FC } from "react";
import { Box, Text } from "@chakra-ui/react";

import { ListItem } from "components/AmountInput";
import { useAstroswap } from "modules/common";

type Props = {
  onClick: (token: string) => void;
  tokens?: string[];
};

const List: FC<Props> = ({ tokens, onClick }) => {
  const { tokens: terraTokens } = useAstroswap();

  if (tokens && tokens.length > 0) {
    return (
      <Box>
        <Box h="xs" overflowY="auto" px="2" mt="2">
          <Box>
            {tokens.map((token) => {
              return <ListItem key={token} token={token} onClick={onClick} />;
            })}
          </Box>
        </Box>
      </Box>
    );
  }

  if (terraTokens == null) {
    return null;
  }

  return (
    <Box>
      <Text variant="spaced">All whitelisted tokens</Text>
      <Box h="xs" overflowY="auto" px="2" mt="2">
        <Box>
          {Object.values(terraTokens).map(({ token }) => {
            return <ListItem key={token} token={token} onClick={onClick} />;
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default List;
