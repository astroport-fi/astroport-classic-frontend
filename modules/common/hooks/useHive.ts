import { request } from "graphql-request";
import { useQuery } from "react-query";

import { useTerraWebapp } from "context/TerraWebappContext";
import {
  ENV_MAINNET_GRAPHQL,
  ENV_TESTNET_GRAPHQL,
  ENV_MAINNET_FALLBACK_GRAPHQL,
  ENV_TESTNET_FALLBACK_GRAPHQL,
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
      hiveEndpoint: ENV_TESTNET_GRAPHQL || "",
      fallbackHiveEndpoint: ENV_TESTNET_FALLBACK_GRAPHQL || "",
    };
  }

  return {
    hiveEndpoint: ENV_MAINNET_GRAPHQL || "",
    fallbackHiveEndpoint: ENV_MAINNET_FALLBACK_GRAPHQL || "",
  };
};

export const useHive = ({ name, query, variables, options }: Params) => {
  const { hiveEndpoint, fallbackHiveEndpoint } = useHiveEndpoint();

  let firstAttempt = true;
  const { data, isLoading } = useQuery(
    name,
    () => {
      const url = firstAttempt ? hiveEndpoint : fallbackHiveEndpoint;
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
