import { useState, useEffect, useCallback } from "react";
import { useTerra } from "contexts/TerraContext";

import { getPools } from "modules/pool";

export const useGetPools = () => {
  const { lpBalances } = useTerra();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { client, pairs } = useTerra();

  const fetchData = useCallback(async () => {
    if (!pairs || !lpBalances) {
      return;
    }

    console.log(pairs);

    const pools: any = await getPools(client, pairs);

    setData(pools);
    setIsLoading(false);
  }, [client, pairs, lpBalances]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading };
};

export default useGetPools;
