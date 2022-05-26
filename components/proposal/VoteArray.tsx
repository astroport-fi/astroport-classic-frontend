import React, { FC, useState, useRef, useCallback } from "react";
import { Flex, Box, Link, Text, useMediaQuery } from "@chakra-ui/react";
import { MOBILE_MAX_WIDTH } from "constants/constants";
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
  const [isMobile] = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH})`);
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
    <Box height="32" overflowX="hidden" overflowY="auto">
      {votes.map((vote, index) => (
        <Flex
          key={index}
          justify="space-between"
          my="1.5"
          mr="1.5"
          fontSize="xs"
          ref={votes.length === index + 1 ? lastElementRef : null}
        >
          <Link href={finder(vote.voter)} isExternal>
            <Text>{truncate(vote.voter, [isMobile ? 3 : 10, 4])}</Text>
          </Link>
          <Text mx="1">
            {handleTinyAmount((vote.voting_power / totalVotingPower) * 100)}%
          </Text>
        </Flex>
      ))}
    </Box>
  );
};

export default VoteArray;
