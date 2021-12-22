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

export const useHive = ({ name, query, variables, options }: Params) => {
  const { network } = useTerraWebapp();
  let GRAPHQL = "https://hive.terra.dev/graphql";

  if (network.name == "testnet") {
    GRAPHQL =
      "http://bombay-hive-graph-temp-862760293.ap-northeast-2.elb.amazonaws.com/graphql";
  }

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
