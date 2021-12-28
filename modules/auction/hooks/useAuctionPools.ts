import { useMemo } from "react";
import { num } from "@arthuryeti/terra";

import { ONE_TOKEN } from "constants/constants";
import { useContracts } from "modules/common";
import { useUserInfo, useConfig, useAuctionState } from "modules/auction";
import { useGetPool } from "modules/pool";
import { getAssetAmountsInPool } from "libs/terra";

export const useAuctionPools = () => {
  const { astroToken, astroUstPool } = useContracts();
  const userInfo = useUserInfo();
  const config = useConfig();
  const state = useAuctionState();
  const { data: pool } = useGetPool(astroUstPool);

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

    const { token1 } = getAssetAmountsInPool(pool.assets, "uusd");
    const totalLiquidity = num(pool.total_share)
      .div(ONE_TOKEN)
      .dp(6)
      .toNumber();
    const totalLiquidityInUst = num(token1)
      .div(ONE_TOKEN)
      .times(2)
      .dp(6)
      .toNumber();

    const myLiquidity = num(userInfo.lp_shares).div(ONE_TOKEN).dp(6).toNumber();
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

    return [
      {
        name: config.pool_info?.astro_ust_pool_address,
        contract: config.pool_info?.astro_ust_pool_address,
        assets: [astroToken, "uusd"],
        pairType: "xyk",
        totalLiquidity,
        totalLiquidityInUst,
        myLiquidity,
        myLiquidityInUst,
        myUnlockableLiquidity,
        myUnlockableLiquidityInUst,
        isClaimable,
        lockEnd,
      },
    ];
  }, [userInfo, config, state, astroToken, pool]);
};

export default useAuctionPools;
