import { request } from "graphql-request";
import { useQuery } from "react-query";

import { useTerraWebapp } from "@arthuryeti/terra";

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
    return "https://hive-terra-test.everstake.one/graphql";
  }

  return "https://hive-terra.everstake.one/graphql";
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
