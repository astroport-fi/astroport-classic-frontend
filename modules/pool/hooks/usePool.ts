import { useMemo } from "react";
import { useBalance } from "@arthuryeti/terra";

import { useTokenPriceInUst } from "modules/swap";
import { calculateSharePrice, useGetPool } from "modules/pool";
import { getTokenDenom } from "modules/common";

type Params = {
  pairContract: string;
  lpTokenContract: string;
};

export const usePool = ({ pairContract, lpTokenContract }: Params) => {
  const { data: pool } = useGetPool(pairContract);
  const lpBalance = useBalance(lpTokenContract);

  const token1 = useMemo(() => {
    if (pool == null) {
      return null;
    }

    return getTokenDenom(pool.assets[0].info);
  }, [pool]);

  const token2 = useMemo(() => {
    if (pool == null) {
      return null;
    }

    return getTokenDenom(pool.assets[1].info);
  }, [pool]);

  // @ts-expect-error
  const token1Price = useTokenPriceInUst(token1);
  // @ts-expect-error
  const token2Price = useTokenPriceInUst(token2);

  const myShareInUST = useMemo(() => {
    if (
      token1 == null ||
      token2 == null ||
      token1Price == null ||
      token2Price == null ||
      lpBalance == null ||
      pool == null
    ) {
      return "0.00";
    }

    return calculateSharePrice(
      pool,
      lpBalance,
      token1,
      token2,
      token1Price,
      token2Price
    );
  }, [pool, lpBalance, token1, token2, token1Price, token2Price]);

  const totalShareInUST = useMemo(() => {
    if (
      token1 == null ||
      token2 == null ||
      token1Price == null ||
      token2Price == null ||
      pool == null
    ) {
      return "0.00";
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

  return {
    ...pool,
    lpBalance,
    myShareInUST,
    totalShareInUST,
    token1,
    token2,
  };
};

export default usePool;
