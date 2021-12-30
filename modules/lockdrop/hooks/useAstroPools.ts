import { useMemo } from "react";
import { num } from "@arthuryeti/terra";
import { gql } from "graphql-request";
import { sortBy } from "lodash";
import dayjs from "dayjs";

import { ONE_TOKEN } from "constants/constants";
import {
  getPoolTokenDenoms,
  useAstroswap,
  useContracts,
  useLunaPrice,
} from "modules/common";
import { useUserInfo } from "modules/lockdrop";
import { useHive } from "hooks/useHive";
import { getAssetAmountsInPool } from "libs/terra";
import { useBLunaPriceInLuna } from "modules/swap";

const createQuery = (pairs, address) => {
  if (pairs.length === 0) {
    return;
  }

  return gql`
    {
      ${pairs.map(({ lp, contract }) => {
        return `
          pool${lp}: wasm {
            contractQuery(
              contractAddress: "${contract}"
              query: {
                pool: { }
              }
            )
          }

          balance${lp}: wasm {
            contractQuery(
              contractAddress: "${lp}"
              query: {
                balance: {
                  address: "${address}"
                }
              }
            )
          }
        `;
      })}
    }
`;
};

export const useAstroPools = () => {
  // const { pairs } = useAstroswap();
  const { lockdrop, pairs } = useContracts();
  const lunaPrice = useLunaPrice();
  const userInfo = useUserInfo();
  const bLunaPrice = useBLunaPriceInLuna();
  const currentTimestamp = dayjs().unix();

  const query = createQuery(pairs, lockdrop);

  const result = useHive({
    name: "astro-pools",
    query,
    options: {
      enabled: !!query,
    },
  });

  return useMemo(() => {
    if (userInfo == null || result == null) {
      return [];
    }

    const items = userInfo.lockup_infos.map((info) => {
      const { assets, total_share } =
        result[`pool${info.astroport_lp_token}`]?.contractQuery;
      const { balance } =
        result[`balance${info.astroport_lp_token}`]?.contractQuery;

      const { token1 } = getAssetAmountsInPool(assets, "uusd");

      let amountOfUst = num(token1).div(ONE_TOKEN).times(2).dp(6).toNumber();

      if (token1 == null) {
        const { token1: uluna, token2 } = getAssetAmountsInPool(
          assets,
          "uluna"
        );

        amountOfUst = num(uluna)
          .plus(num(token2).times(bLunaPrice))
          .div(ONE_TOKEN)
          .times(lunaPrice)
          .dp(6)
          .toNumber();
      }

      const totalLiquidityInUst = amountOfUst;

      const totalLiquidity = num(balance).div(ONE_TOKEN).toNumber();
      const myLiquidity = num(info.astroport_lp_units)
        .div(ONE_TOKEN)
        .toNumber();
      const myLiquidityInUst = num(myLiquidity)
        .times(totalLiquidityInUst)
        .div(num(total_share).div(ONE_TOKEN))
        .toNumber();

      return {
        name: info.terraswap_lp_token,
        astroLpToken: info.astroport_lp_token,
        assets: getPoolTokenDenoms(assets),
        // TODO: change once LPs are migrated to Astro
        pairType: "xyk",
        totalLiquidity,
        totalLiquidityInUst,
        myLiquidity,
        myLiquidityInUst,
        lockEnd: info.unlock_timestamp,
        isClaimable: currentTimestamp > info.unlock_timestamp,
        isClaimed: num(info.astroport_lp_transferred).gt(0),
        duration: info.duration,
        astroRewards: +info.astro_rewards / ONE_TOKEN,
      };
    });

    return sortBy(items, "myLiquidityInUst").reverse();
  }, [userInfo, result, lunaPrice]);
};

export default useAstroPools;
