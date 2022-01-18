import { useMemo } from "react";
import { gql } from "graphql-request";

import { useApi } from "modules/common";
import { useTerraWebapp } from "@arthuryeti/terra";

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
  const { network } = useTerraWebapp();
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

    if (!result.isLoading && result.data == null) {
      return {
        isLoading: false,
        data: null,
      };
    }

    if (result.data != null && network.name == "testnet") {
      return {
        isLoading: false,
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
