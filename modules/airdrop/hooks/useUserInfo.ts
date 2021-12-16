import { useAddress, useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

import { useContracts } from "modules/common";

type Response = {
  airdrop_amount: string;
  delegated_amount: string;
  tokens_withdrawn: boolean;
};

export const useUserInfo = () => {
  const { client } = useTerraWebapp();
  const address = useAddress();
  const { airdrop } = useContracts();

  const { data, isLoading } = useQuery(["userInfo", "airdrop", address], () => {
    return client.wasm.contractQuery<Response>(airdrop, {
      user_info: {
        address,
      },
    });
  });

  if (isLoading || data == null) {
    return null;
  }

  return data;
};

export default useUserInfo;
