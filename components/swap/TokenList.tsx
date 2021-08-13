import React, { FC } from "react";
import { Box, Text } from "@chakra-ui/react";

import { useTerra } from "contexts/TerraContext";
import TokenItem from "components/swap/TokenItem";

type Props = {
  onTokenClick: () => void;
};

const TokenList: FC<Props> = ({ onTokenClick }) => {
  const { tokens } = useTerra();

  return (
    <Box>
      <Text variant="spaced">All whitelisted tokens</Text>
      <Box h="xs" overflowY="auto" px="2" mt="2">
        <Box>
          {Object.values(tokens).map((token) => {
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
