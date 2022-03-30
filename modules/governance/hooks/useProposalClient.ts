import { useMemo } from "react";
import { useAddress, useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

import { useContracts } from "modules/common";

type ProposalResponse = {
  title: string;
  description: string;
  link: string | null;
  message: string | null;
  status: string;
  submitter: string;
  for_voters: string[];
  against_voters: string[];
};

export const useProposalClient = (proposalId: string): any => {
  const { client } = useTerraWebapp();
  const address = useAddress();
  const { assembly } = useContracts();

  const { data, isLoading, error } = useQuery(["proposal", "assembly"], () => {
    return client.wasm.contractQuery<ProposalResponse>(assembly, {
      proposal: {
        proposal_id: Number(proposalId),
      },
    });
  });

  return useMemo(() => {
    if (isLoading || data == null) {
      return null;
    }

    return data;
  }, [isLoading, data, error]);
};

export default useProposalClient;
