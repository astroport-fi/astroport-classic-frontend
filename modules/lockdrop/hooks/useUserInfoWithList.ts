import { useMemo } from "react";
import { useAddress, useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

import { useContracts } from "modules/common";

type Response = {
  total_astro_rewards: string;
  delegated_astro_rewards: string;
  astro_transferred: boolean;
  lockup_infos: {
    pool_address: string;
    duration: number;
  }[];
  lockup_positions_index: number;
};

export const useUserInfoWithList = () => {
  const { client } = useTerraWebapp();
  const address = useAddress();
  const { lockdrop } = useContracts();

  const { data, isLoading } = useQuery(
    ["userInfoWithList", "lockdrop", address],
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

export default useUserInfoWithList;
