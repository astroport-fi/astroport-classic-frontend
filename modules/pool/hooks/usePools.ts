import { useMemo, useCallback, useState, useEffect } from "react";
import { useTerraWebapp } from "@arthuryeti/terra";
import BigNumber from "bignumber.js";

import { useLpBalances } from "modules/pool";
import { useAstroswap } from "modules/common";

export const usePools = () => {
  const [all, setAll] = useState([]);
  const { client } = useTerraWebapp();
  const { pairs } = useAstroswap();
  const lpBalances = useLpBalances();

  // TODO: Move it to the backend
  const getAll = useCallback(async () => {
    if (pairs == null) {
      return null;
    }

    const poolQueries = pairs.map(async (pair) => {
      const pool: any = await client.wasm.contractQuery(pair.contract_addr, {
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

    return null;
  }, [pairs, client]);

  const mine = useMemo(() => {
    if (pairs == null) {
      return null;
    }

    return pairs.filter((v) => {
      // @ts-expect-error
      return new BigNumber(lpBalances[v.liquidity_token]).isGreaterThan(0);
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
