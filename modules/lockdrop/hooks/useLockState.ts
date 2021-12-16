import { useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

import { useContracts } from "modules/common";
import { ONE_TOKEN } from "constants/constants";

type Response = {
  are_claims_allowed: boolean;
  supported_pairs_list: string[];
  total_astro_delegated: string;
  total_incentives_share: number;
};

export const useLockState = () => {
  const { client } = useTerraWebapp();
  const { lockdrop } = useContracts();

  const { data, isLoading } = useQuery("state", () => {
    return client.wasm.contractQuery<Response>(lockdrop, {
      state: {},
    });
  });

  if (isLoading || data == null) {
    return null;
  }

  return {
    astroRewardsAllocated: +data.total_incentives_share / ONE_TOKEN,
    ...data,
  };
};

export default useLockState;
