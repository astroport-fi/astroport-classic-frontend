import { useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

import { useContracts } from "modules/common";

type Response = {
  total_airdrop_size: string;
  total_delegated_amount: string;
  unclaimed_tokens: string;
};

export const useAirdopState = () => {
  const { client } = useTerraWebapp();
  const { airdrop } = useContracts();

  const { data, isLoading } = useQuery(["airdrop", "state"], () => {
    return client.wasm.contractQuery<Response>(airdrop, {
      state: {},
    });
  });

  if (isLoading || data == null) {
    return null;
  }

  return data;
};

export default useAirdopState;
