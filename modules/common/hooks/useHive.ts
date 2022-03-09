import { request } from "graphql-request";
import { useQuery } from "react-query";

import { useTerraWebapp } from "@arthuryeti/terra";
import { ENV_MAINNET_GRAPHQL, ENV_TESTNET_GRAPHQL } from "constants/constants";

type Params = {
  name: string | string[];
  query: any;
  variables?: {
    [key: string]: any;
  };
  options?: any;
};

export const useHiveEndpoint = () => {
  const { network } = useTerraWebapp();

  if (network.name == "testnet") {
    return ENV_TESTNET_GRAPHQL;
  }

  return ENV_MAINNET_GRAPHQL;
};

export const useHive = ({ name, query, variables, options }: Params) => {
  const GRAPHQL = useHiveEndpoint();

  const { data, isLoading } = useQuery(
    name,
    () => {
      return request(GRAPHQL, query, variables);
    },
    options
  );

  if (isLoading || data == null) {
    return null;
  }

  return data;
};

export default useHive;
