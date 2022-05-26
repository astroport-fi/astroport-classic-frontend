import { useMemo } from "react";
import num from "libs/num";
import {
  useGetPool,
  useShareOfPool,
  useLpToTokens,
  useShareInUst,
  useGetPoolInfo,
  shouldReverseTokenOrder,
} from "modules/pool";
import { useBalance, Asset, getTokenDenom, useTokenInfo } from "modules/common";
import { useStakedLpAmount } from "modules/generator";

export type Rewards = {
  pool: number;
  astro: number;
  protocol: number;
  total: number;
  apy: number;
  token_symbol: string;
};

export type Pool = {
  assets?: [Asset, Asset] | undefined;
  pairContract: string;
  lpTokenContract: string;
  poolType: string | null;
  total: {
    share?: string | undefined;
    shareInUst: string | number | null;
  };
  mine: {
    share: string;
    shareInUst: string | number | null;
    shareOfPool: number | null;
  };
  token1: {
    asset: string;
    share?: string | undefined;
    amount: string | undefined;
  };
  token2: {
    asset: string;
    share?: string | undefined;
    amount: string | undefined;
  };
  _24hr_volume: string | number | null;
  rewards: Rewards;
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
  const poolInfo = useGetPoolInfo(pairContract);
  const lpBalance = useBalance(lpTokenContract);
  const shareOfPool = useShareOfPool({ pool, lpAmount: lpBalance });
  const stakedAmount = useStakedLpAmount(lpTokenContract);
  const tokenAmounts = useLpToTokens({ pool, amount: lpBalance });
  const myShare = num(stakedAmount).plus(lpBalance).toString();
  const { getSymbol } = useTokenInfo();

  const token1 = useMemo(() => {
    if (pool == null) {
      return null;
    }

    const firstToken = pool.assets ? pool.assets[0] : null;

    if (firstToken == null) {
      return null;
    }

    return getTokenDenom(firstToken.info);
  }, [pool]);

  const token2 = useMemo(() => {
    if (pool == null) {
      return null;
    }

    const secondToken = pool.assets ? pool.assets[1] : null;

    if (secondToken == null) {
      return null;
    }

    return getTokenDenom(secondToken.info);
  }, [pool]);

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

    const firstToken = pool.assets ? pool.assets[0] : null;
    const secondToken = pool.assets ? pool.assets[1] : null;

    const data = {
      assets: pool.assets,
      pairContract: pairContract,
      lpTokenContract: lpTokenContract,
      poolType: poolInfo?.pool_type,
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
        share: firstToken?.amount,
        amount: tokenAmounts?.[token1],
      },
      token2: {
        asset: token2,
        share: secondToken?.amount,
        amount: tokenAmounts?.[token2],
      },
      _24hr_volume: poolInfo?._24hr_volume,
      rewards: {
        pool: poolInfo?.trading_fees?.apy || 0,
        astro: poolInfo?.astro_rewards?.apr || 0,
        protocol: poolInfo?.protocol_rewards?.apr || 0,
        total: poolInfo?.total_rewards?.apr || 0,
        apy: poolInfo?.total_rewards?.apy || 0,
        token_symbol: poolInfo?.token_symbol,
      },
    };

    if (shouldReverseTokenOrder(getSymbol(token1), getSymbol(token2))) {
      const tempToken1 = data.token1;
      data.token1 = data.token2;
      data.token2 = tempToken1;
    }

    return data;
  }, [
    pool,
    totalShareInUst,
    shareOfPool,
    tokenAmounts,
    token1,
    token2,
    myShare,
    myShareInUst,
    poolInfo,
  ]);
};

export default usePool;
