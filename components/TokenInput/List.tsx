import React, { FC } from "react";
import { Box, Text } from "@chakra-ui/react";
import { ListItem } from "components/TokenInput";
import { useAstroswap, useTokenInfo } from "modules/common";

type Props = {
  onClick: (token: string) => void;
  tokens?: string[];
  filter?: string;
};

const List: FC<Props> = ({ tokens, onClick, filter = "" }) => {
  const { tokens: terraTokens } = useAstroswap();
  const { getSymbol } = useTokenInfo();

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

  const matchToken = (token: string) => {
    return getSymbol(token).toLowerCase().includes(filter.toLowerCase());
  };

  const filteredTokens = Object.values(terraTokens).filter(({ token }) =>
    matchToken(token)
  );

  return (
    <Box>
      <Text textStyle="minibutton">
        {filter.length > 0
          ? `${filteredTokens.length} token found`
          : "All tokens"}
      </Text>
      <Box h="xs" overflowY="auto" mt="2">
        {filteredTokens.map(({ token }) => {
          return <ListItem key={token} token={token} onClick={onClick} />;
        })}
      </Box>
    </Box>
  );
};

export default List;
