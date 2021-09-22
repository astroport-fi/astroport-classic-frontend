import React, { FC } from "react";
import { Box } from "@chakra-ui/react";
import { useTerra } from "@arthuryeti/terra";

import { ListLPItem } from "components/AmountInput";

type Props = {
  onClick: (v: string) => void;
};

const ListLP: FC<Props> = ({ onClick }) => {
  const { pairs } = useTerra();

  return (
    <Box>
      <Box h="xs" overflowY="auto" px="2" mt="2">
        <Box>
          {pairs.map((pair) => {
            return (
              <ListLPItem key={pair.contract} pair={pair} onClick={onClick} />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default ListLP;
