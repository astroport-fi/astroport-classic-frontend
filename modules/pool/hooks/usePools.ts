import { useMemo, useCallback, useState, useEffect } from "react";
import { useTerra } from "@arthuryeti/terra";
import BigNumber from "bignumber.js";

import { useLpBalances } from "modules/pool";

export const usePools = () => {
  const [all, setAll] = useState([]);
  const { client, pairs } = useTerra();
  const lpBalances: any = useLpBalances();

  // TODO: Move it to the backend
  const getAll = useCallback(async () => {
    const poolQueries = pairs.map(async (pair) => {
      const pool: any = await client.wasm.contractQuery(pair.contract, {
        pool: {},
      });

      return {
        ...pair,
        ...pool,
      };
    });

    try {
      const pools: any = await Promise.all(poolQueries);

      setAll(pools);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }, [pairs, client]);

  const mine = useMemo(() => {
    return pairs.filter((v) => {
      return new BigNumber(lpBalances[v.lpToken]).isGreaterThan(0);
    });
  }, [lpBalances, pairs]);

  useEffect(() => {
    getAll();
  }, [getAll]);

  return {
    mine,
    all,
  };
};

export default usePools;
