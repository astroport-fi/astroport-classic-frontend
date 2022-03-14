import { request } from "graphql-request";
import { useQuery } from "react-query";
import { ENV_API_ENDPOINT } from "constants/constants";

type Params = {
  name: string | string[];
  query: any;
  variables?: {
    [key: string]: any;
  };
  options?: any;
};

export const useApi = ({ name, query, variables, options }: Params) => {
  const result = useQuery(
    name,
    () => {
      return request(ENV_API_ENDPOINT, query, variables);
    },
    options
  );

  return result;
};

export default useApi;
