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
    }
  }
`;

export const useProposal = (proposalId: string): Proposal => {
  const { data, isLoading, error } = useApi({
    name: "proposal",
    query,
    variables: {
      proposalId,
    },
    options: {
      enabled: !!query,
    },
  });

  return useMemo(() => {
    if (isLoading || data == null || data.proposal == null) {
      return null;
    }

    return data.proposal;
  }, [data, isLoading]);
};

export default useProposal;
