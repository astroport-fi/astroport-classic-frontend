import { useMemo } from "react";
import { num, useBalance } from "@arthuryeti/terra";

import {
  useGetPool,
  useShareOfPool,
  useLpToTokens,
  useShareInUst,
} from "modules/pool";
import { Asset, getTokenDenom, useTokenInfo } from "modules/common";
import { useStakedLpAmount } from "modules/generator";

export type Pool = {
  assets: [Asset, Asset];
  pairContract: string;
  lpTokenContract: string;
  total: {
    share: string;
    shareInUst: string | number | null;
  };
  mine: {
    share: string;
    shareInUst: string | number | null;
    shareOfPool: number | null;
  };
  token1: {
    asset: string;
    share: string;
    amount: string | undefined;
    price: number | null;
  };
  token2: {
    asset: string;
    share: string;
    amount: string | undefined;
    price: number | null;
  };
};

type Params = {
  pairContract: string;
  lpTokenContract: string;
};

export const usePool = ({
  pairContract,
  lpTokenContract,
}: Params): Pool | null => {
  const { data: pool } = useGetPool(pairContract);
  const lpBalance = useBalance(lpTokenContract);
  const shareOfPool = useShareOfPool({ pool, lpAmount: lpBalance });
  const stakedAmount = useStakedLpAmount(lpTokenContract);
  const tokenAmounts = useLpToTokens({ pool, amount: lpBalance });
  const myShare = num(stakedAmount).plus(lpBalance).toString();
  const { getDecimals } = useTokenInfo();

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

  const token1Decimals = getDecimals(token1);
  const token2Decimals = getDecimals(token2);

  const myShareInUst = useShareInUst({
    pool,
    amount: myShare,
  });

  const totalShareInUst = useShareInUst({
    pool,
    amount: pool?.total_share,
  });

  return useMemo(() => {
    if (pool == null || token1 == null || token2 == null) {
      return null;
    }

    return {
      assets: pool.assets,
      pairContract: pairContract,
      lpTokenContract: lpTokenContract,
      total: {
        share: pool.total_share,
        shareInUst: totalShareInUst,
      },
      mine: {
        share: myShare,
        shareInUst: myShareInUst,
        shareOfPool,
      },
      token1: {
        asset: token1,
        share: pool.assets[0].amount,
        amount: tokenAmounts?.[token1],
        price:
          num(pool.assets[1].amount)
            .div(10 ** token2Decimals)
            .div(num(pool.assets[0].amount).div(10 ** token1Decimals))
            .dp(6)
            .toNumber() || 0,
      },
      token2: {
        asset: token2,
        share: pool.assets[1].amount,
        amount: tokenAmounts?.[token2],
        price:
          num(pool.assets[0].amount)
            .div(10 ** token1Decimals)
            .div(num(pool.assets[1].amount).div(10 ** token2Decimals))
            .dp(6)
            .toNumber() || 0,
      },
    };
  }, [
    pool,
    totalShareInUst,
    shareOfPool,
    tokenAmounts,
    token1,
    token2,
    myShare,
    myShareInUst,
  ]);
};

export default usePool;
