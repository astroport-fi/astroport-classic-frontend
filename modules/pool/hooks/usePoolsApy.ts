import { useMemo } from "react";
import { gql } from "graphql-request";
import { useApi } from "modules/common";

const query = gql`
  query {
    pools {
      pool_address
      token_symbol
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

export const usePoolsApy = () => {
  const { data, isLoading } = useApi({
    name: ["pools", "all", "apys"],
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

export default usePoolsApy;
