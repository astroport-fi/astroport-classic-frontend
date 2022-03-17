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

    // filter out stale and executed proposals
    return data.proposals.filter(
      (proposal: Proposal) =>
        proposal.state !== "Stale" && proposal.state !== "Executed"
    );
  }, [data, isLoading]);
};

export default useProposals;
