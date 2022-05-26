import { useMemo } from "react";
import useAddress from "hooks/useAddress";
import { gql } from "graphql-request";
import { sortBy } from "lodash";
import num from "libs/num";
import { ONE_TOKEN } from "constants/constants";
import { AstroPoolsPool } from "types/common";
import {
  getPoolTokenDenoms,
  useAstroswap,
  useContracts,
  useHive,
  useTokenInfo,
  useLunaPriceInUst,
  useStableTokenPrice,
} from "modules/common";
import { useUserInfoWithList } from "modules/lockdrop";
import { getAssetAmountsInPool } from "libs/terra";

const createFirstQuery = ({
  infos,
  lockdrop,
  generator,
  stakableLps,
  address,
}: {
  infos: any;
  lockdrop: string;
  generator: string;
  stakableLps: any;
  address: string;
}) => {
  if (infos == null || infos.length === 0) {
    return;
  }

  return gql`
    {
      ${infos.map(
        ({
          pool_address,
          duration,
        }: {
          pool_address: string;
          duration: string;
        }) => {
          return `
          ${pool_address}${duration}: wasm {
            contractQuery(
              contractAddress: "${lockdrop}"
              query: {
                lock_up_info: {
                  user_address: "${address}",
                  terraswap_lp_token: "${pool_address}",
                  duration: ${duration}
                }
              }
            )
          }
        `;
        }
      )}

      ${stakableLps.map((lp: string) => {
        return `
          ${lp}: wasm {
            contractQuery(
              contractAddress: "${generator}"
              query: {
                reward_info: {
                  lp_token: "${lp}"
                }
              }
            )
          }
        `;
      })}
    }
`;
};

const createSecondQuery = (pools: any) => {
  if (pools == null || pools.length === 0) {
    return;
  }

  return gql`
    {
      ${pools.map(
        ({
          pool_address,
          lp_address,
        }: {
          pool_address: string;
          lp_address: string;
        }) => {
          return `
          pool${lp_address}: wasm {
            contractQuery(
              contractAddress: "${pool_address}"
              query: {
                pool: { }
              }
            )
          }
        `;
        }
      )}
    }
`;
};

export const useAstroPools = () => {
  const { pools } = useAstroswap();
  const { lockdrop, astroToken, stakableLp, generator, bLunaToken } =
    useContracts();
  const { getDecimals } = useTokenInfo();
  const address = useAddress() || "";
  const lunaPrice = useLunaPriceInUst();
  const userInfo = useUserInfoWithList();
  const bLunaPrice = useStableTokenPrice(bLunaToken, "uluna");
  const { getSymbol } = useTokenInfo();

  const firstQuery = createFirstQuery({
    infos: userInfo?.lockup_infos,
    lockdrop,
    generator,
    stakableLps: stakableLp,
    address,
  });

  const firstResult = useHive({
    name: "astro-pools",
    query: firstQuery,
    options: {
      enabled: !!firstQuery,
    },
  });

  const secondQuery = createSecondQuery(pools);

  const secondResult = useHive({
    name: "astro-pools-second",
    query: secondQuery,
    options: {
      enabled: !!secondQuery,
    },
  });

  const infos = useMemo(() => {
    if (firstResult == null) {
      return null;
    }

    return Object.keys(firstResult).map((key) => {
      return firstResult[key].contractQuery;
    });
  }, [firstResult]);

  return useMemo((): AstroPoolsPool[] => {
    if (infos == null || secondResult == null || firstResult == null) {
      return [];
    }

    const filteredItems = infos.filter((info) => {
      return (
        info.astroport_lp_transferred == null &&
        secondResult[`pool${info.astroport_lp_token}`] != null
      );
    });

    const rewardInfos = Object.keys(firstResult).map((key) => {
      return { ...firstResult[key].contractQuery, lp: key };
    });

    const items = filteredItems.map((info) => {
      const { assets, total_share } =
        secondResult[`pool${info.astroport_lp_token}`]?.contractQuery;
      const pool = (pools || []).find(
        (pool) => pool.lp_address == info.astroport_lp_token
      );
      const { token1: token1Amount } = getAssetAmountsInPool(assets, "uusd");
      let amountOfUst = num(token1Amount)
        .div(ONE_TOKEN)
        .times(2)
        .dp(6)
        .toNumber();
      const [token1, token2] = getPoolTokenDenoms(assets);
      const token1Symbol = getSymbol(token1 || "");
      const token2Symbol = getSymbol(token2 || "");

      if (token1Amount == null) {
        const { token1: uluna, token2: uluna2 } = getAssetAmountsInPool(
          assets,
          "uluna"
        );
        amountOfUst = num(uluna)
          .plus(num(uluna2).times(bLunaPrice))
          .div(ONE_TOKEN)
          .times(lunaPrice)
          .dp(6)
          .toNumber();
      }

      const totalLiquidityInUst = amountOfUst;
      const totalLiquidity = num(total_share).div(ONE_TOKEN).dp(6).toNumber();
      const myLiquidity = num(info.astroport_lp_units)
        .div(ONE_TOKEN)
        .toNumber();
      const myLiquidityInUst = num(myLiquidity)
        .times(totalLiquidityInUst)
        .div(num(total_share).div(ONE_TOKEN))
        .toNumber();

      const rewardInfo = rewardInfos.find(
        ({ lp }) => lp == info.astroport_lp_token
      );

      const rewards = [
        {
          token: astroToken,
          amount:
            +info.claimable_generator_astro_debt /
            10 ** getDecimals(astroToken),
        },
      ];

      if (rewardInfo?.proxy_reward_token != null) {
        rewards.push({
          token: rewardInfo.proxy_reward_token,
          amount:
            +info.claimable_generator_proxy_debt /
            10 ** getDecimals(rewardInfo.proxy_reward_token),
        });
      }

      return {
        name: info.terraswap_lp_token,
        astroLpToken: info.astroport_lp_token,
        assets: [token1, token2],
        poolAssets: assets,
        sortingAssets: [
          token1Symbol.toLowerCase(),
          token2Symbol.toLowerCase(),
          token1,
          token2,
          info.terraswap_lp_token,
        ],
        pairType: pool?.pool_type,
        totalLiquidity,
        totalLiquidityInUst,
        myLiquidity,
        myLiquidityInUst,
        lockEnd: info.unlock_timestamp,
        // Proposal #10 has passed to unlock all lockdrop liquidity regardless of unlock_timestamp
        // isClaimable: currentTimestamp > info.unlock_timestamp,
        isClaimable: true,
        isClaimed: num(info.astroport_lp_transferred).gt(0),
        duration: info.duration,
        rewards,
      };
    });

    return sortBy(items, "myLiquidityInUst").reverse();
  }, [userInfo, infos, secondResult, lunaPrice]);
};

export default useAstroPools;
