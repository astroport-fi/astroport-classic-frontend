import { useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

import { PoolResponse } from "modules/common";

export const useGetPool = (pairContract: string) => {
  const { client } = useTerraWebapp();

  return useQuery(["pool", pairContract], () => {
    return client.wasm.contractQuery<PoolResponse>(pairContract, {
      pool: {},
    });
  });
};

export default useGetPool;
