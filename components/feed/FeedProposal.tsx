import React, { FC, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { Proposal } from "types/common";
import UnderlineButton from "components/UnderlineButton";

import Card from "components/governance/Card";

const DEFAULT_PAGE_SIZE = 4;

type Props = {
  proposals: Proposal[];
  quorum: string | undefined;
};

const FeedProposal: FC<Props> = ({ proposals, quorum }) => {
  const [feedSize, setFeedSize] = useState(DEFAULT_PAGE_SIZE);

  const loadMoreItems = () => {
    const numberItems =
      feedSize + DEFAULT_PAGE_SIZE < proposals.length
        ? feedSize + DEFAULT_PAGE_SIZE
        : proposals.length;
    setFeedSize(numberItems);
  };

  return (
    <>
      {proposals.slice(0, feedSize).map((proposal, i) => (
        <Flex key={i} my="4">
          <Card proposal={proposal} quorum={quorum} />
        </Flex>
      ))}
      {proposals.length > feedSize && (
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

export default FeedProposal;
