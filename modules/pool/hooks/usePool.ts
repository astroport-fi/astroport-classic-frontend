import { useState, useEffect, useMemo } from "react";
import { useTerra } from "contexts/TerraContext";

import { useTokenPrice } from "modules/swap";
import { getTokenDenom } from "modules/terra";
import { calculateSharePrice } from "modules/pool";

export const usePool: any = (pair) => {
  const { lpBalances } = useTerra();
  const [sharePrice, setSharePrice] = useState(["0.00", "0.00"]);
  const token1 =
    pair?.pool?.assets?.[0] && getTokenDenom(pair?.pool.assets?.[0]);
  const token2 =
    pair?.pool?.assets?.[1] && getTokenDenom(pair?.pool.assets?.[1]);
  const token1Price = useTokenPrice(token1);
  const token2Price = useTokenPrice(token2);

  useEffect(() => {
    if (lpBalances && token1Price && token2Price && pair) {
      const lpTokenAmount = lpBalances.get(pair.lpToken)?.amount.toString();

      const resultMine = calculateSharePrice(
        pair.pool,
        lpTokenAmount,
        token1,
        token2,
        token1Price,
        token2Price
      );

      const resultTotal = calculateSharePrice(
        pair.pool,
        pair.pool.total_share,
        token1,
        token2,
        token1Price,
        token2Price
      );

      setSharePrice([resultMine, resultTotal]);
    }
  }, [lpBalances, pair, token1, token2, token1Price, token2Price]);

  const totalSharePrice = useMemo(() => {
    if (!(pair && token1Price && token2Price)) {
      return null;
    }

    return calculateSharePrice(
      pair.pool,
      pair.pool.total_share,
      token1,
      token2,
      token1Price,
      token2Price
    );
  }, [pair, token1, token2, token1Price, token2Price]);

  const accountShare = useMemo(() => {
    if (!pair || !accountShare) {
      return "0%";
    }

    return "calculateShare(pair, token, amount)";
  }, [pair]);

  return {
    name,
    accountShare,
    totalSharePrice,
    sharePrice,
    pair,
    token1,
    token2,
    token1Price,
    token2Price,
  };
};

export default usePool;
