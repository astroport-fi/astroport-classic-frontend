import { useMemo } from "react";
import { useAddress, useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

import { useContracts } from "modules/common";

type Response = {
  airdrop_amount: string;
  delegated_amount: string;
  tokens_withdrawn: boolean;
};

export const useUserInfo2 = () => {
  const { client } = useTerraWebapp();
  const address = useAddress();
  const { airdrop2 } = useContracts();

  const { data, isLoading } = useQuery(
    ["userInfo", "airdrop2", address],
    () => {
      return client.wasm.contractQuery<Response>(airdrop2, {
        user_info: {
          address,
        },
      });
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return useMemo(() => {
    if (isLoading || data == null) {
      return null;
    }

    return data;
  }, [isLoading, data]);
};

export default useUserInfo2;
