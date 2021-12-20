import React, { FC } from "react";
import { Box } from "@chakra-ui/react";

import { ListLPItem } from "components/TokenInput";
import { useAstroswap } from "modules/common";

type Props = {
  onClick: (v: string) => void;
};

const ListLP: FC<Props> = ({ onClick }) => {
  const { pairs } = useAstroswap();

  if (pairs == null) {
    return null;
  }

  return (
    <Box>
      <Box h="xs" overflowY="auto" px="2" mt="2">
        <Box>
          {pairs.map((pair) => {
            return (
              <ListLPItem
                key={pair.contract_addr}
                pair={pair}
                onClick={onClick}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default ListLP;
