import React, { FC } from "react";
import { Box } from "@chakra-ui/react";
import { FeedPoolTypes } from "types/common";

import { orderPoolTokens } from "modules/pool";
import { useTokenInfo } from "modules/common";

import FeedPoolItemBody from "./FeedPoolItemBody";
import FeedPoolItemAction from "./FeedPoolItemAction";

type Props = {
  type: FeedPoolTypes;
  pool: any;
  txFeeNotEnough: boolean;
};

const FeedPoolItem: FC<Props> = ({ type, pool, txFeeNotEnough }) => {
  const { getSymbol } = useTokenInfo();

  const [token1, token2] = orderPoolTokens(
    { asset: pool.assets[0], symbol: getSymbol(pool.assets[0]) },
    { asset: pool.assets[1], symbol: getSymbol(pool.assets[1]) }
  );

  return (
    <Box bg="white.50" mb="5" borderRadius="xl" color="white">
      <FeedPoolItemBody
        type={type}
        pool={pool}
        token1={token1 || ""}
        token2={token2 || ""}
      />
      <FeedPoolItemAction
        type={type}
        pool={pool}
        token1={token1 || ""}
        token2={token2 || ""}
        txFeeNotEnough={txFeeNotEnough}
      />
    </Box>
  );
};

export default FeedPoolItem;
