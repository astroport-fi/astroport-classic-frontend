import { useMemo } from "react";
import { useAddress, useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

import { useContracts } from "modules/common";

type Params = {
  proposal_id: number;
};

type Response = string | null;

export const useVotingPower = ({ proposal_id }: Params): Response => {
  const { client } = useTerraWebapp();
  const { assembly } = useContracts();
  const address = useAddress();

  const { data, isLoading } = useQuery("votingPower", () => {
    return client.wasm.contractQuery<Response>(assembly, {
      user_voting_power: {
        proposal_id,
        user: address,
      },
    });
  });

  return useMemo(() => {
    if (isLoading || data == null) {
      return null;
    }

    return data;
  }, [isLoading]);
};

export default useVotingPower;
