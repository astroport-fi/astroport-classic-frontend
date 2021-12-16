import { useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

import { useContracts } from "modules/common";

type Response = {
  astro_token: string;
  auction_contract: string;
  deposit_window: number;
  generator: string;
  init_timestamp: number;
  lockdrop_incentives: string;
  max_lock_duration: number;
  min_lock_duration: number;
  owner: string;
  weekly_divider: number;
  weekly_multiplier: number;
  withdrawal_window: number;
};

export const useConfig = () => {
  const { client } = useTerraWebapp();
  const { lockdrop } = useContracts();

  const { data, isLoading } = useQuery("config", () => {
    return client.wasm.contractQuery<Response>(lockdrop, {
      config: {},
    });
  });

  if (isLoading || data == null) {
    return null;
  }

  return data;
};

export default useConfig;
