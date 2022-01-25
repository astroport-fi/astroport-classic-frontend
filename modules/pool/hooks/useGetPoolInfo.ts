import { useMemo } from "react";
import { gql } from "graphql-request";
import { useApi } from "modules/common";

const query = gql`
  query Pool($address: String!) {
    pool(address: $address) {
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

export const useGetPoolInfo = (contract: string) => {
  const { data, isLoading } = useApi({
    name: ["pool", contract, "info"],
    query,
    variables: {
      address: contract,
    },
    options: {
      enabled: !!query,
    },
  });

  return useMemo(() => {
    if (isLoading || data == null) {
      return null;
    }

    if (data != null) {
      return data.pool;
    }
  }, [data, isLoading]);
};

export default useGetPoolInfo;
