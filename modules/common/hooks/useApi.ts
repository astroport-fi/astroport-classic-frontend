import { request } from "graphql-request";
import { useQuery } from "react-query";
import { ENV_CLASSIC_API } from "constants/constants";

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
      return request(ENV_CLASSIC_API, query, variables);
    },
    options
  );

  return result;
};

export default useApi;
