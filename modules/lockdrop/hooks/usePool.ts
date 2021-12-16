import { useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

import { useContracts } from "modules/common";

type Response = {
  generator_astro_per_share: string;
  generator_proxy_per_share: string;
  incentives_share: number;
  is_staked: boolean;
  terraswap_pool: string;
  terraswap_amount_in_lockups: string;
  weighted_amount: string;
  migration_info: {
    terraswap_migrated_amount: string;
    astroport_lp_token: string;
  };
};

export const usePool = (lpToken: string) => {
  const { client } = useTerraWebapp();
  const { lockdrop } = useContracts();

  const { data, isLoading } = useQuery(["pool", lpToken], () => {
    return client.wasm.contractQuery<Response>(lockdrop, {
      pool: {
        terraswap_lp_token: lpToken,
      },
    });
  });

  if (isLoading || data == null) {
    return null;
  }

  return data;
};

export default usePool;
