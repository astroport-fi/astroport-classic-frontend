import { useState, useEffect, useCallback } from "react";
import { isEmpty } from "lodash";

import { useTerra } from "contexts/TerraContext";
import { simulateSwap } from "modules/swap";

export const useSimulation = (
  token1: string,
  token2?: string,
  amount1?: string
) => {
  const [result, setResult] = useState({
    amount: "0",
    spreadAmount: "0",
  });

  const {
    networkInfo: { routeContract },
    client,
    routes,
  } = useTerra();

  const getData = useCallback(async () => {
    if (!token1 || isEmpty(routes)) {
      return;
    }

    const result = await simulateSwap(
      client,
      routeContract,
      routes,
      token1,
      token2,
      amount1
    );

    setResult(result);
  }, [client, routeContract, routes, token1, token2, amount1]);

  useEffect(() => {
    getData();
  }, [token1, getData]);

  return result;
};

export default useSimulation;
