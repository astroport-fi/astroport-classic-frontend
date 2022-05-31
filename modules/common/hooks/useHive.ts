import { request } from "graphql-request";
import { useQuery } from "react-query";
import { ENV_CLASSIC_GQL } from "constants/constants";

type Params = {
  name: string | string[];
  query: any;
  variables?: {
    [key: string]: any;
  };
  options?: any;
};

export const useHiveEndpoint = () => {
  return {
    hiveEndpoint: ENV_CLASSIC_GQL,
    fallbackHiveEndpoint: ENV_CLASSIC_GQL,
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
