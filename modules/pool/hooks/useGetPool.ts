import { useTerraWebapp } from "context/TerraWebappContext";
import { useQuery } from "react-query";

import { PoolResponse } from "modules/common";
import { QUERY_STALE_TIME } from "constants/constants";

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
      staleTime: QUERY_STALE_TIME,
    }
  );
};

export default useGetPool;
