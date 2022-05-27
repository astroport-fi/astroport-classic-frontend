import { useMemo } from "react";
import { useTerraWebapp } from "context/TerraWebappContext";
import { useQuery } from "react-query";
import { PROPOSAL_VOTE_POWER } from "constants/constants";
import num from "libs/num";
import { useContracts } from "modules/common";
import useAddress from "hooks/useAddress";

type Params = {
  proposal_id: number;
};

type Response = number | null;

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

    return num(data).div(PROPOSAL_VOTE_POWER).toNumber();
  }, [isLoading]);
};

export default useVotingPower;
