import React, { FC, useState } from "react";
import {
  AllPoolsPool,
  AstroPoolsPool,
  AuctionPoolsPool,
  FeedPoolTypes,
  PoolWithUserState,
} from "types/common";
import UnderlineButton from "components/UnderlineButton";
import FeedPoolItem from "./FeedPoolItem";

const DEFAULT_PAGE_SIZE = 15;

type Props = {
  type: FeedPoolTypes;
  pools:
    | AllPoolsPool[]
    | PoolWithUserState[]
    | AstroPoolsPool[]
    | AuctionPoolsPool[];
  txFeeNotEnough?: boolean;
};

const Feed: FC<Props> = ({ type, pools, txFeeNotEnough }) => {
  const [feedSize, setFeedSize] = useState(DEFAULT_PAGE_SIZE);

  const loadMoreItems = () => {
    const numberItems =
      feedSize + DEFAULT_PAGE_SIZE < pools.length
        ? feedSize + DEFAULT_PAGE_SIZE
        : pools.length;
    setFeedSize(numberItems);
  };

  return (
    <>
      {pools.slice(0, feedSize).map((pool, i) => (
        <FeedPoolItem
          key={i}
          type={type}
          pool={pool}
          txFeeNotEnough={txFeeNotEnough || false}
        />
      ))}
      {pools.length > feedSize && (
        <UnderlineButton
          w="100%"
          fontWeight="500"
          color="brand.purpleAlt"
          onClick={() => loadMoreItems()}
        >
          Load More
        </UnderlineButton>
      )}
    </>
  );
};

export default Feed;
