import { useAddress, useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

import { useContracts } from "modules/common";

type Response = {
  owner: string;
  astro_token_address: string;
  airdrop_contract_address: string;
  lockdrop_contract_address: string;
  pool_info: {
    astro_ust_pool_address: string;
    astro_ust_lp_token_address: string;
  };
  generator_contract: string;
  astro_incentive_amount: string;
  lp_tokens_vesting_duration: number;
  lockdrop_incentives: number;
  init_timestamp: number;
  deposit_window: number;
  withdrawal_window: number;
};

export const useConfig = () => {
  const { client } = useTerraWebapp();
  const { auction } = useContracts();

  const { data, isLoading } = useQuery(["auction", "config"], () => {
    return client.wasm.contractQuery<Response>(auction, {
      config: {},
    });
  });

  if (isLoading || data == null) {
    return null;
  }

  return data;
};

export default useConfig;
