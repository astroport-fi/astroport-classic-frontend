import { useMemo } from "react";
import { gql } from "graphql-request";
import { useApi } from "modules/common";

const query = gql`
  query staking {
    staking {
      _7d_apy
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

    return Number(data.staking?._7d_apy * 100);
  }, [data, isLoading]);
};

export default useGovStakingAPY;
