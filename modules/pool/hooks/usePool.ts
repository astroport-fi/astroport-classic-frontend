import { useState, useEffect, useMemo } from "react";
import { useTerra } from "contexts/TerraContext";

import { useTokenPrice } from "modules/swap";
import { getTokenDenom } from "modules/terra";
import { calculateSharePrice } from "modules/pool";
import { Pair } from "types/common";

type Options = {
  pool: Pair;
  lpToken: string;
};

export const usePool: any = ({ pool, lpToken }) => {
  const { lpBalances } = useTerra();
  const [sharePrice, setSharePrice] = useState(["0.00", "0.00"]);
  const token1 = pool?.assets?.[0] && getTokenDenom(pool.assets?.[0]);
  const token2 = pool?.assets?.[1] && getTokenDenom(pool.assets?.[1]);
  const token1Price = useTokenPrice(token1);
  const token2Price = useTokenPrice(token2);

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

  const totalSharePrice = useMemo(() => {
    if (!(pool && token1Price && token2Price)) {
      return null;
    }

    return calculateSharePrice(
      pool,
      pool.total_share,
      token1,
      token2,
      token1Price,
      token2Price
    );
  }, [pool, token1, token2, token1Price, token2Price]);

  const accountShare = useMemo(() => {
    if (!pool || !accountShare) {
      return "0%";
    }

    return "calculateShare(pool, token, amount)";
  }, [pool]);

  return {
    name,
    accountShare,
    totalSharePrice,
    sharePrice,
    pool,
    token1,
    token2,
    token1Price,
    token2Price,
  };
};

export default usePool;
