import { request } from "graphql-request";
import { useQuery } from "react-query";

import { useTerraWebapp } from "@arthuryeti/terra";
import {
  DEFAULT_MAINNET_GRAPHQL,
  DEFAULT_TESTNET_GRAPHQL,
  ENV_MAINNET_GRAPHQL,
  ENV_TESTNET_GRAPHQL,
} from "constants/constants";

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
    return {
      hiveEndpoint: ENV_TESTNET_GRAPHQL,
      defaultHiveEndpoint: DEFAULT_TESTNET_GRAPHQL,
    };
  }

  return {
    hiveEndpoint: ENV_MAINNET_GRAPHQL,
    defaultHiveEndpoint: DEFAULT_MAINNET_GRAPHQL,
  };
};

export const useHive = ({ name, query, variables, options }: Params) => {
  const { hiveEndpoint, defaultHiveEndpoint } = useHiveEndpoint();

  let firstAttempt = true;
  const { data, isLoading } = useQuery(
    name,
    () => {
      const url = firstAttempt ? hiveEndpoint : defaultHiveEndpoint;
      firstAttempt = false;
      return request(url, query, variables);
    },
    { ...options, retry: 1 }
  );

  if (isLoading || data == null) {
    return null;
  }

  return data;
};

export default useHive;
