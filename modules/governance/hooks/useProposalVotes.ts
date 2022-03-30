import { useMemo } from "react";
import { gql } from "graphql-request";
import { useApi } from "modules/common";
import { Proposal } from "types/common";

type VoteResponse = {
  voter: string;
  voting_power: number;
};

const query = gql`
  query Votes($proposalId: String!, $choice: String) {
    votes(proposal_id: $proposalId, choice: $choice) {
      voter
      voting_power
    }
  }
`;

export const useProposalVotes = (
  proposalId: string
): { votesFor: VoteResponse[]; votesAgainst: VoteResponse[] } => {
  const { data: votesFor } = useApi({
    name: ["proposal", "votes", "for", proposalId],
    query,
    variables: {
      proposalId,
      choice: "for",
    },
    options: {
      enabled: !!query,
    },
  });

  const { data: votesAgainst } = useApi({
    name: ["proposal", "votes", "against", proposalId],
    query,
    variables: {
      proposalId,
      choice: "against",
    },
    options: {
      enabled: !!query,
    },
  });

  return useMemo(() => {
    return {
      votesFor: votesFor?.votes || [],
      votesAgainst: votesAgainst?.votes || [],
    };
  }, [votesFor, votesAgainst]);
};

export default useProposalVotes;
