import { useMemo } from "react";
import { useQuery } from "react-query";
import { useContracts } from "modules/common";
import { useTerraWebapp } from "context/TerraWebappContext";

type Response = {
  proposal_effective_delay: number;
  proposal_expiration_period: number;
  proposal_required_deposit: string;
  proposal_required_quorum: string;
  proposal_required_threshold: string;
  proposal_voting_period: number;
};

export const useConfig = () => {
  const { client } = useTerraWebapp();
  const { assembly } = useContracts();

  const { data, isLoading } = useQuery(
    "configProposal",
    () => {
      return client.wasm.contractQuery<Response>(assembly, {
        config: {},
      });
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return useMemo(() => {
    if (isLoading || data == null) {
      return null;
    }

    return data;
  }, [isLoading, data]);
};

export default useConfig;
