import React, { FC } from "react";
import { Box } from "@chakra-ui/react";

import { ListLPItem } from "components/TokenInput";
import { useAstroswap } from "modules/common";

type Props = {
  onClick: (v: string) => void;
};

const ListLP: FC<Props> = ({ onClick }) => {
  const { pools } = useAstroswap();

  if (pools == null) {
    return null;
  }

  return (
    <Box>
      <Box h="xs" overflowY="auto" px="2" mt="2">
        <Box>
          {pools.map((pool) => {
            return (
              <ListLPItem
                key={pool.pool_address}
                pool={pool}
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
