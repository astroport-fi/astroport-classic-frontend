import { useMemo } from "react";
import { num } from "@arthuryeti/terra";

import { ONE_TOKEN } from "constants/constants";
import { useContracts } from "modules/common";
import { useUserInfo, useConfig, useAuctionState } from "modules/auction";

export const useAuctionPools = () => {
  const { astroToken } = useContracts();
  const userInfo = useUserInfo();
  const config = useConfig();
  const state = useAuctionState();

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
    if (userInfo == null || config == null || state == null) {
      return [];
    }

    const totalLiquidity = num(state.lp_shares_minted)
      .div(ONE_TOKEN)
      .dp(6)
      .toNumber();
    const totalLiquidityInUst = num(state.total_ust_delegated)
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

    const myUnlockedLiquidity = num(userInfo.claimed_lp_shares)
      .div(ONE_TOKEN)
      .dp(6)
      .toNumber();
    const myUnlockedLiquidityInUst = num(myUnlockedLiquidity)
      .times(totalLiquidityInUst)
      .div(totalLiquidity)
      .dp(6)
      .toNumber();

    const isClaimable = num(userInfo.withdrawable_lp_shares).gt(0);

    console.log(userInfo);

    return [
      {
        name: config.pool_info?.astro_ust_pool_address,
        contract: config.pool_info?.astro_ust_pool_address,
        assets: [astroToken, "uusd"],
        totalLiquidity,
        totalLiquidityInUst,
        myLiquidity,
        myLiquidityInUst,
        myUnlockedLiquidity,
        myUnlockedLiquidityInUst,
        isClaimable,
        lockEnd,
      },
    ];
  }, [userInfo, config, state, astroToken]);
};

export default useAuctionPools;
