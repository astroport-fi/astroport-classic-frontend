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

export const useApi = ({ name, query, variables, options }: Params) => {
  const { network } = useTerraWebapp();
  let GRAPHQL = "https://api.astroport.fi/graphql";

  if (network.name == "testnet") {
    GRAPHQL =
      "https://2h8711jruf.execute-api.us-east-1.amazonaws.com/dev/graphql";
  }

  const result = useQuery(
    name,
    () => {
      return request(GRAPHQL, query, variables);
    },
    options
  );

  return result;
};

export default useApi;
