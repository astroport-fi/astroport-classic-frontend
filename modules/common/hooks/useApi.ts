import { request } from "graphql-request";
import { useQuery } from "react-query";
import { useTerraWebapp } from "@arthuryeti/terra";
import {
  ENV_COLUMBUS_API_ENDPOINT,
  ENV_BOMBAY_API_ENDPOINT,
} from "constants/constants";

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
  const API_URL =
    network.name === "testnet"
      ? ENV_BOMBAY_API_ENDPOINT
      : ENV_COLUMBUS_API_ENDPOINT;

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
