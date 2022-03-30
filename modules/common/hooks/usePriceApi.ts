import { useMemo } from "react";
import { gql } from "graphql-request";
import { useApi } from "modules/common";
import { QUERY_STALE_TIME } from "constants/constants";

const query = gql`
  query price($address: String!) {
    price(tokenAddress: $address) {
      price_ust
    }
  }
`;

export const usePriceApi = (token: string) => {
  const { data, isLoading } = useApi({
    name: ["price", token],
    query,
    variables: {
      address: token,
    },
    options: {
      enabled: !!query,
      staleTime: QUERY_STALE_TIME,
    },
  });

  return useMemo(() => {
    if (isLoading || data == null || data?.price == null) {
      return 0;
    }

    if (data.price?.price_ust == null) {
      return 0;
    }

    return data.price?.price_ust;
  }, [data, isLoading]);
};

export default usePriceApi;
