import React, { FC } from "react";
import { Box, HStack, Text } from "@chakra-ui/react";

import { TagItem } from "components/TokenInput";

type Props = {
  tokens: string[];
  onClick: (token: string) => void;
};

const TagList: FC<Props> = ({ tokens, onClick }) => {
  return (
    <Box pb="2">
      <Text textStyle="minibutton">Common tokens</Text>
      <Box overflowY="auto" mt="2">
        <HStack>
          {tokens.map((token) => (
            <TagItem key={token} token={token} onClick={onClick} />
          ))}
        </HStack>
      </Box>
    </Box>
  );
};

export default TagList;
