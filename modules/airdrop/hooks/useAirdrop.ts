import { useMemo } from "react";
import { gql } from "graphql-request";

import { useApi } from "modules/common";

const query = gql`
  query ($address: String!) {
    airdrop(address: $address) {
      index
      merkle_proof
      claimed
      amount
      airdrop_series
    }
  }
`;

export const useAirdrop = (address: string | undefined) => {
  const result = useApi({
    name: ["airdrop", address],
    query,
    variables: {
      address,
    },
    options: {
      enabled: !!address,
    },
  });

  return useMemo(() => {
    if (result.isLoading) {
      return {
        isLoading: true,
        data: null,
      };
    }

    return {
      isLoading: false,
      data: result.data.airdrop,
    };
  }, [result.data]);
};

export default useAirdrop;
