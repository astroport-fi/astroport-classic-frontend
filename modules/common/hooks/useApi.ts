import { request } from "graphql-request";
import { useQuery } from "react-query";
import { useTerraWebapp } from "context/TerraWebappContext";
import { ENV_APIS } from "constants/constants";

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
  const API_URL = ENV_APIS[network.name];

  const result = useQuery(
    name,
    () => {
      return request(API_URL, query, variables);
    },
    options
  );

  return result;
};

export default useApi;
