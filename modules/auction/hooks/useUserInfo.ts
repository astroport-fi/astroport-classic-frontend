import { useMemo } from "react";
import { useAddress, useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

import { useContracts } from "modules/common";
import { QUERY_STALE_TIME } from "constants/constants";

type Response = {
  astro_delegated: string;
  ust_delegated: string;
  ust_withdrawn: boolean;
  lp_shares: string;
  claimed_lp_shares: string;
  withdrawable_lp_shares: string;
  auction_incentive_amount: string;
  astro_incentive_transferred: boolean;
  claimable_generator_astro: string;
  generator_astro_debt: string;
};

export const useUserInfo = () => {
  const { client } = useTerraWebapp();
  const address = useAddress();
  const { auction } = useContracts();

  const { data, isLoading } = useQuery(
    ["userInfo", "auction", address],
    () => {
      if (!address) {
        return null;
      }

      return client.wasm.contractQuery<Response>(auction, {
        user_info: {
          address,
        },
      });
    },
    {
      staleTime: QUERY_STALE_TIME,
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
