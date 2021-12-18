import React, { FC } from "react";
import { Box, HStack, Text } from "@chakra-ui/react";

import { TagItem } from "components/AmountInput";
import { COMMON_TOKENS } from "constants/constants";

type Props = {
  onClick: (token: string) => void;
};

const CommonTokensList: FC<Props> = ({ onClick }) => {
  return (
    <Box>
      <Text textStyle="minibutton">Common tokens</Text>
      <Box overflowY="auto" mt="2">
        <HStack>
          {Object.values(COMMON_TOKENS).map((token) => {
            return <TagItem key={token} token={token} onClick={onClick} />;
          })}
        </HStack>
      </Box>
    </Box>
  );
};

export default CommonTokensList;
