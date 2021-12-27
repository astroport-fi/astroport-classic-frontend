import React, { FC } from "react";
import { Box, HStack, Text } from "@chakra-ui/react";

import { TagItem } from "components/TokenInput";
import { COMMON_TOKENS } from "constants/constants";

type Props = {
  hideToken?: string;
  onClick: (token: string) => void;
};

const CommonTokensList: FC<Props> = ({ hideToken, onClick }) => {
  return (
    <Box pb="2">
      <Text textStyle="minibutton">Common tokens</Text>
      <Box overflowY="auto" mt="2">
        <HStack>
          {Object.values(COMMON_TOKENS).map((token) => {
            if (hideToken === token) {
              return null;
            }
            return <TagItem key={token} token={token} onClick={onClick} />;
          })}
        </HStack>
      </Box>
    </Box>
  );
};

export default CommonTokensList;
