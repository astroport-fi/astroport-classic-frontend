import { useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

import { Asset } from "modules/common";

type Response = {
  assets: [Asset, Asset];
  total_share: string;
};

export const useGetPool = (pairContract: string) => {
  const { client } = useTerraWebapp();

  return useQuery(["pool", pairContract], () => {
    return client.wasm.contractQuery<Response>(pairContract, {
      pool: {},
    });
  });
};

export default useGetPool;
