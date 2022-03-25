import { useMemo } from "react";
import { gql } from "graphql-request";
import { useApi } from "modules/common";
import { Proposal } from "types/common";

const query = gql`
  query Proposals {
    proposals {
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

export const useProposals = (): Proposal[] => {
  const { data, isLoading } = useApi({
    name: "proposals",
    query,
    options: {
      enabled: !!query,
    },
  });

  return useMemo(() => {
    if (isLoading || data == null || data.proposals == null) {
      return null;
    }

    // filter out expired and executed proposals
    return data.proposals.filter(
      (proposal: Proposal) =>
        proposal.state !== "Expired" && proposal.state !== "Executed"
    );
  }, [data, isLoading]);
};

export default useProposals;
