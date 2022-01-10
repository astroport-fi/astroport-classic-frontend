import { useMemo } from "react";
import { useAddress, useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

import { useContracts } from "modules/common";

type Response = {
  total_astro_rewards: string;
  delegated_astro_rewards: string;
  astro_transferred: boolean;
  claimable_generator_astro_debt: string;
  claimable_generator_proxy_debt: string;
  lockup_infos: {
    astro_rewards?: string;
    terraswap_lp_token: string;
    lp_units_locked: string;
    withdrawal_flag: boolean;
    duration: number;
    generator_astro_debt: string;
    claimable_generator_astro_debt: string;
    generator_proxy_debt: string;
    claimable_generator_proxy_debt: string;
    unlock_timestamp: number;
    astroport_lp_units?: string;
    astroport_lp_token?: string;
    astroport_lp_transferred?: string;
  }[];
};

export const useUserInfo = () => {
  const { client } = useTerraWebapp();
  const address = useAddress();
  const { lockdrop } = useContracts();

  const { data, isLoading } = useQuery(
    ["userInfo", "lockdrop", address],
    () => {
      return client.wasm.contractQuery<Response>(lockdrop, {
        user_info_with_lockups_list: {
          address,
        },
      });
    }
  );

  return useMemo(() => {
    if (isLoading || data == null) {
      return null;
    }

    return data;
  }, [isLoading, data]);
};

export default useUserInfo;
