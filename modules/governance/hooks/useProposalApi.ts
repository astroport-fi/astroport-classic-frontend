import { useMemo } from "react";
import { gql } from "graphql-request";
import { useApi } from "modules/common";
import { Proposal } from "types/common";

const query = gql`
  query Proposal($proposalId: String!) {
    proposal(proposal_id: $proposalId) {
      proposal_id
      state
      title
      description
      link
      messages
      submitter
      start_timestamp
      end_timestamp
      active
      passed
      executed
      rejected
      expired
      votes_for
      votes_against
      votes_for_power
      votes_against_power
      total_voting_power
    }
  }
`;

export const useProposalApi = (
  proposalId: string
): { proposal?: Proposal; proposalExists?: boolean } => {
  const { data, isLoading, error } = useApi({
    name: ["proposal", proposalId],
    query,
    variables: {
      proposalId,
    },
    options: {
      enabled: !!query,
    },
  });

  return useMemo(() => {
    if (isLoading || data == null) {
      return { proposal: null };
    }

    // proposal doesn't exist
    if (data.proposal == null) {
      return { proposalExists: false };
    }

    return { proposal: data.proposal, proposalExists: true };
  }, [data, isLoading]);
};

export default useProposalApi;
