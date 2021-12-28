import React, { FC } from "react";
import { Box, Text } from "@chakra-ui/react";
import { ListItem } from "components/TokenInput";

type Props = {
  onClick: (token: string) => void;
  tokens: string[];
  filtered?: boolean;
};

const List: FC<Props> = ({ tokens, onClick, filtered = false }) => {
  return (
    <Box>
      {tokens.length === 0 ? (
        <Text textStyle="minibutton" color="red.500">
          Token not found
        </Text>
      ) : (
        <Text textStyle="minibutton">
          {filtered ? `${tokens.length}` : "all"} token found
        </Text>
      )}
      <Box h="3xs" overflowY="auto" mt="2">
        {tokens.map((token) => {
          return <ListItem key={token} token={token} onClick={onClick} />;
        })}
      </Box>
    </Box>
  );
};

export default List;
