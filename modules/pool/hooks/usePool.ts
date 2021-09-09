import { useState, useEffect, useCallback } from "react";
import { useTerra, getTokenDenom } from "@arthuryeti/terra";

import { useTokenPrice } from "modules/swap";
import { calculateSharePrice } from "modules/pool";
import { Pair } from "types/common";

type Params = Pair;

export const usePool: any = ({ contract, lpToken, asset_infos }: Params) => {
  const { lpBalances, client } = useTerra();
  const [pool, setPool] = useState(null);
  const [sharePrice, setSharePrice] = useState(["0.00", "0.00"]);
  const token1 = getTokenDenom(asset_infos[0]);
  const token2 = getTokenDenom(asset_infos[1]);
  const token1Price = useTokenPrice(token1);
  const token2Price = useTokenPrice(token2);

  const getPool = useCallback(async () => {
    try {
      const res: any = await client.wasm.contractQuery(contract, {
        pool: {},
      });

      setPool(res);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }, [client, contract]);

  useEffect(() => {
    getPool();
  }, [getPool]);

  useEffect(() => {
    if (lpBalances && token1Price && token2Price && lpToken && pool) {
      const lpTokenAmount = lpBalances.get(lpToken)?.amount.toString();

      const resultMine = calculateSharePrice(
        pool,
        lpTokenAmount,
        token1,
        token2,
        token1Price,
        token2Price
      );

      const resultTotal = calculateSharePrice(
        pool,
        pool.total_share,
        token1,
        token2,
        token1Price,
        token2Price
      );

      setSharePrice([resultMine, resultTotal]);
    }
  }, [lpBalances, pool, lpToken, token1, token2, token1Price, token2Price]);

  return {
    ...pool,
    sharePrice,
    token1,
    token2,
  };
};

export default usePool;
