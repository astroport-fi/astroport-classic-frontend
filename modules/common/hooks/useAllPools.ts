import { useMemo } from "react";
import { gql } from "graphql-request";
import { useApi, isNativeToken } from "modules/common";
import { QUERY_STALE_TIME } from "constants/constants";

const query = gql`
  query Pools {
    pools {
      lp_address
      pool_address
      token_symbol
      trading_fee
      pool_liquidity
      _24hr_volume
      trading_fees {
        apy
        apr
        day
      }
      astro_rewards {
        apy
        apr
        day
      }
      protocol_rewards {
        apy
        apr
        day
      }
      total_rewards {
        apy
        apr
        day
      }
      prices {
        token1_address
        token1_price_ust
        token2_address
        token2_price_ust
      }
      pool_type
      reward_proxy_address
    }
  }
`;

export const useAllPools = () => {
  const { data, isLoading, isError } = useApi({
    name: "pools",
    query,
    options: {
      enabled: !!query,
      staleTime: QUERY_STALE_TIME,
    },
  });

  return useMemo(() => {
    let pools = [];

    if (!isLoading && data != null) {
      pools = data.pools
        .map((pool: any) => {
          if (
            !pool.lp_address ||
            !pool.pool_address ||
            !pool.pool_type ||
            !pool.prices.token1_address ||
            !pool.prices.token2_address
          ) {
            return null;
          }

          const assets = [
            pool.prices.token1_address,
            pool.prices.token2_address,
          ].map((asset) => {
            if (isNativeToken(asset)) {
              return {
                native_token: {
                  denom: asset,
                },
              };
            }

            return {
              token: {
                contract_addr: asset,
              },
            };
          });

          return {
            lp_address: pool.lp_address,
            pool_address: pool.pool_address,
            pool_type: pool.pool_type,
            assets,
          };
        })
        .filter(Boolean);
    }

    return { pools, isLoading, isError };
  }, [data, isLoading]);
};

export default useAllPools;
