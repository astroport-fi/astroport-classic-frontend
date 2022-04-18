import { useState, useEffect, useMemo } from "react";
import { gql } from "graphql-request";
import { useApi } from "modules/common";
import { QUERY_STALE_TIME } from "constants/constants";

type Response = {
  isLoading: boolean;
  hasMore: boolean;
  votes: { voter: string; voting_power: number }[];
};

const DEFAULT_VOTES_LIMIT = 50;

const query = gql`
  query Votes(
    $proposalId: String!
    $choice: String
    $offset: Int
    $limit: Int
  ) {
    votes(
      proposal_id: $proposalId
      choice: $choice
      offset: $offset
      limit: $limit
    ) {
      voter
      voting_power
    }
  }
`;

export const useProposalVotes = (
  proposalId: string,
  choice: "for" | "against",
  pageNum: number
): Response => {
  const [hasMore, setHasMore] = useState(false);
  const [votes, setVotes] = useState([]);

  const { data, isLoading } = useApi({
    name: ["proposal", "votes", proposalId, choice, pageNum.toString()],
    query,
    variables: {
      proposalId,
      choice,
      offset: pageNum * DEFAULT_VOTES_LIMIT,
      limit: DEFAULT_VOTES_LIMIT,
    },
    options: {
      enabled: !!query,
      staleTime: QUERY_STALE_TIME,
    },
  });

  useEffect(() => {
    if (data?.votes && data?.votes.length > 0) {
      setVotes((votes) => [...votes, ...data.votes]);
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }, [data, isLoading]);

  return { votes, isLoading, hasMore };
};

export default useProposalVotes;
