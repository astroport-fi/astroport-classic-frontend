import { useMemo } from "react";
import { gql } from "graphql-request";
import { useApi } from "modules/common";

const query = gql`
  query staking {
    staking {
      _24h_fees_ust
      _24h_apr
      _24h_apy
      block
    }
  }
`;

export const useGovStakingAPY = (): number | null => {
  const { data, isLoading } = useApi({
    name: "staking",
    query,
    options: {
      enabled: !!query,
    },
  });

  return useMemo(() => {
    if (isLoading || data == null || data?.staking == null) {
      return null;
    }

    return Number(data.staking?._24h_apy * 100);
  }, [data, isLoading]);
};

export default useGovStakingAPY;
