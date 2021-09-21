import React, { FC } from "react";
import { Box } from "@chakra-ui/react";

import { Pair } from "types/common";
import LpTokenItem from 'components/common/LpTokenItem';

type Props = {
  onTokenClick: (pair: Pair) => void;
  pairs: Pair[];
};

const LpTokenList: FC<Props> = (props) => {
  const {
    onTokenClick,
    pairs,
  } = props;

    return (
      <Box>
        <Box h="xs" overflowY="auto" px="2" mt="2">
          <Box>
            {pairs.map((pair) => {
              return (
                <LpTokenItem
                  key={pair.lpToken}
                  pair={pair}
                  onClick={onTokenClick}
                />
              );
            })}
          </Box>
        </Box>
      </Box>
    );
};

export default LpTokenList;
