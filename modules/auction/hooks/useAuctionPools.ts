import { useMemo } from "react";
import num from "libs/num";

import { ONE_TOKEN } from "constants/constants";
import { getTokenDenom, useContracts, useTokenInfo } from "modules/common";
import { useUserInfo, useConfig, useAuctionState } from "modules/auction";
import { useGetPool } from "modules/pool";
import { getAssetAmountsInPool } from "libs/terra";
import { useTokenPriceInUstWithSimulate } from "modules/swap";

export const useAuctionPools = () => {
  const { astroToken, astroUstPool } = useContracts();
  const { getDecimals } = useTokenInfo();
  const userInfo = useUserInfo();
  const config = useConfig();
  const state = useAuctionState();
  const { data: pool } = useGetPool(astroUstPool);
  const price = useTokenPriceInUstWithSimulate(astroToken);

  const lockEnd = useMemo(() => {
    if (config == null) {
      return null;
    }

    return (
      config.init_timestamp +
      config.deposit_window +
      config.withdrawal_window +
      config.lp_tokens_vesting_duration
    );
  }, [config]);

  return useMemo(() => {
    if (userInfo == null || config == null || state == null || pool == null) {
      return [];
    }

    const { token1: token1Amount } = getAssetAmountsInPool(pool.assets, "uusd");
    const totalLiquidity = num(pool.total_share)
      .div(ONE_TOKEN)
      .dp(6)
      .toNumber();
    const totalLiquidityInUst = num(token1Amount)
      .div(ONE_TOKEN)
      .times(2)
      .dp(6)
      .toNumber();

    const myLiquidity = num(userInfo.lp_shares)
      .minus(num(userInfo.claimed_lp_shares))
      .div(ONE_TOKEN)
      .dp(6)
      .toNumber();

    const myLiquidityInUst = num(myLiquidity)
      .times(totalLiquidityInUst)
      .div(totalLiquidity)
      .dp(6)
      .toNumber();

    const myUnlockableLiquidity = num(userInfo.withdrawable_lp_shares)
      .div(ONE_TOKEN)
      .dp(6)
      .toNumber();
    const myUnlockableLiquidityInUst = num(myUnlockableLiquidity)
      .times(totalLiquidityInUst)
      .div(totalLiquidity)
      .dp(6)
      .toNumber();

    const isClaimable = num(userInfo.withdrawable_lp_shares).gt(0);
    const isClaimed =
      userInfo.astro_incentive_transferred &&
      num(userInfo.withdrawable_lp_shares).eq(0);

    const rewards = [
      {
        token: astroToken,
        amount:
          +userInfo.claimable_generator_astro / 10 ** getDecimals(astroToken),
      },
    ];

    let poolAssets;
    if (getTokenDenom(pool.assets[0].info) === astroToken) {
      poolAssets = [
        {
          amount: pool.assets[0].amount,
          info: { token: { contract_addr: astroToken } },
        },
        pool.assets[1],
      ];
    } else if (getTokenDenom(pool.assets[1].info) === astroToken) {
      poolAssets = [
        {
          amount: pool.assets[1].amount,
          info: { token: { contract_addr: astroToken } },
        },
        pool.assets[0],
      ];
    }

    return [
      {
        name: config.pool_info?.astro_ust_pool_address,
        contract: config.pool_info?.astro_ust_pool_address,
        assets: [astroToken, "uusd"],
        poolAssets,
        sortingAssets: [
          config.pool_info?.astro_ust_pool_address,
          astroToken,
          "uusd",
          "astro",
          "ust",
        ],
        pairType: "xyk",
        totalLiquidity,
        totalLiquidityInUst,
        myLiquidity,
        myLiquidityInUst,
        myUnlockableLiquidity,
        myUnlockableLiquidityInUst,
        isClaimable,
        isClaimed,
        amount: userInfo.withdrawable_lp_shares,
        lockEnd,
        rewards,
      },
    ];
  }, [userInfo, config, state, astroToken, pool]);
};

export default useAuctionPools;
