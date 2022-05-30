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

  return {
    hiveEndpoint: "https://columbus-hive.terra.dev/graphql",
    fallbackHiveEndpoint: "https://columbus-hive.terra.dev/graphql",
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
