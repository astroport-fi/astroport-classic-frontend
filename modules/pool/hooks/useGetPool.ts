import { useState, useEffect, useCallback } from "react";
import { useTerra } from "contexts/TerraContext";

import { getPool } from "modules/pool";

export const useGetPool = (pair) => {
  const { client } = useTerra();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!pair) {
      return;
    }

    // const route = routes[token1][token2];

    console.log(pair);

    try {
      const pool: any = await getPool(client, pair);

      setData(pool);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }, [client, pair]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  console.log(data);

  return { data, isLoading };
};

export default useGetPool;
