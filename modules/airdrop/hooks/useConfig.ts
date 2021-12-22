import { useMemo } from "react";
import { useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

import { useContracts } from "modules/common";

type Response = {
  owner: string;
  astro_token_address: string;
  merkle_roots: string;
  from_timestamp: number;
  to_timestamp: number;
  auction_contract_address: string;
  are_claims_allowed: string;
};

export const useConfig = () => {
  const { client } = useTerraWebapp();
  const { airdrop } = useContracts();

  const { data, isLoading } = useQuery("configAirdrop", () => {
    return client.wasm.contractQuery<Response>(airdrop, {
      config: {},
    });
  });

  return useMemo(() => {
    if (isLoading || data == null) {
      return null;
    }

    return data;
  }, [isLoading]);
};

export default useConfig;
