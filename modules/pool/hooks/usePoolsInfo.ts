import { useMemo } from "react";
import { gql } from "graphql-request";
import { useApi } from "modules/common";

const query = gql`
  query {
    pools {
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
    }
  }
`;

export const usePoolsInfo = () => {
  const { data, isLoading } = useApi({
    name: ["pools", "all", "info"],
    query,
    options: {
      enabled: !!query,
    },
  });

  return useMemo(() => {
    if (isLoading || data == null) {
      return [];
    }

    if (data != null) {
      return data.pools;
    }
  }, [data, isLoading]);
};

export default usePoolsInfo;