import { useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

import { PoolResponse } from "modules/common";

export const useGetPool = (contract: string | null) => {
  const { client } = useTerraWebapp();

  return useQuery(
    ["pool", contract],
    () => {
      return client.wasm.contractQuery<PoolResponse>(contract, {
        pool: {},
      });
    },
    {
      refetchOnWindowFocus: false,
      enabled: contract != null,
    }
  );
};

export default useGetPool;
