import { useMemo } from "react";
import { gql } from "graphql-request";
import { useApi } from "modules/common";

const query = gql`
  query Price($address: String!) {
    price(tokenAddress: $address) {
      price_in_ust
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
    },
  });

  return useMemo(() => {
    if (isLoading || data == null || data?.price == null) {
      return 0;
    }

    if (data.price?.price_in_ust == null) {
      return 0;
    }

    return data.price?.price;
  }, [data, isLoading]);
};

export default usePriceApi;
