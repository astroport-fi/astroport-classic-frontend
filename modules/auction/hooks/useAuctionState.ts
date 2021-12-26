import { useAddress, useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

import { useContracts } from "modules/common";

type Response = {
  total_astro_delegated: string;
  total_ust_delegated: string;
  is_lp_staked: boolean;
  lp_shares_minted: string;
  pool_init_timestamp: number;
  generator_astro_per_share: number;
};

export const useAuctionState = () => {
  const { client } = useTerraWebapp();
  const address = useAddress();
  const { auction } = useContracts();

  const { data, isLoading } = useQuery(["stateAuction", address], () => {
    return client.wasm.contractQuery<Response>(auction, {
      state: {},
    });
  });

  if (isLoading || data == null) {
    return null;
  }

  return data;
};

export default useAuctionState;
