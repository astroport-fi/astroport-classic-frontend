import { useState, useEffect, useCallback } from "react";
import { isEmpty } from "lodash";
import { useTerra, isValidAmount } from "@arthuryeti/terra";

import { simulateSwap } from "modules/swap";
import networks from "constants/networks";

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
    networkInfo: { name },
    client,
    routes,
  } = useTerra();
  const { routeContract } = networks[name];

  const getData = useCallback(async () => {
    if (!token1 || isEmpty(routes) || !isValidAmount(amount1)) {
      setResult({
        amount: "0",
        spreadAmount: "0",
      });

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

    setResult(result as any);
  }, [token1, routes, amount1, client, routeContract, token2]);

  useEffect(() => {
    getData();
  }, [token1, getData]);

  return result;
};

export default useSimulation;
