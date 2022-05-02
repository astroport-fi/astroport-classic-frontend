import React, { FC, useState, useRef, useCallback } from "react";
import { Flex, Box, Link, Text } from "@chakra-ui/react";
import { truncate } from "libs/text";
import useFinder from "hooks/useFinder";
import { handleTinyAmount } from "modules/common";

import { useProposalVotes } from "modules/governance";

type Props = {
  proposalId: string;
  choice: "for" | "against";
  totalVotingPower: number;
};

const VoteArray: FC<Props> = ({ proposalId, choice, totalVotingPower }) => {
  const finder = useFinder();
  const [pageNum, setPageNum] = useState(0);
  const { votes, isLoading, hasMore } = useProposalVotes(
    proposalId,
    choice,
    pageNum
  );

  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting && hasMore) {
          setPageNum((num) => num + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  return (
    <Box height="32" overflowY="auto">
      {votes.map((vote, index) => (
        <Flex
          key={index}
          justify="space-between"
          my="1.5"
          fontSize="xs"
          ref={votes.length === index + 1 ? lastElementRef : null}
        >
          <Link href={finder(vote.voter)} isExternal>
            <Text>{truncate(vote.voter, [10, 4])}</Text>
          </Link>
          <Text mr="1">
            {handleTinyAmount((vote.voting_power / totalVotingPower) * 100)}%
          </Text>
        </Flex>
      ))}
    </Box>
  );
};

export default VoteArray;
