import { useQuery } from "react-query";
import request, { gql } from "graphql-request";
import { useHiveEndpoint } from "modules/common";
import { useTerraWebapp } from "context/TerraWebappContext";

interface TokenInfo {
  decimals: number;
  name: string;
  symbol: string;
  total_supply: string;
  error?: string;
}

type GetTokenResponse = {
  tokenInfo: TokenInfo | null;
  isLoading: boolean;
  hasError: boolean;
};

type TokenInfoContractQueryResponse = {
  [contractAddr: string]: {
    contractQuery: TokenInfo;
  };
};

const buildQuery = (contract_addr: string) => gql`
  {
    ${contract_addr}: wasm {
      contractQuery(
        contractAddress: "${contract_addr}"
        query: {
          token_info: {}
        }
      )
    }
  }
`;

export const useGetToken = (contract_addr: string): GetTokenResponse => {
  const {
    network: { chainID },
  } = useTerraWebapp();

  const { hiveEndpoint, fallbackHiveEndpoint } = useHiveEndpoint();
  let firstAttempt = true;

  const { data, isLoading, isError } = useQuery<TokenInfoContractQueryResponse>(
    [hiveEndpoint, chainID, "token", contract_addr],
    async () => {
      const url = firstAttempt ? hiveEndpoint : fallbackHiveEndpoint;
      firstAttempt = false;
      return request(url, buildQuery(contract_addr));
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!contract_addr,
      retry: 1,
    }
  );

  let dataHasError = false;
  let tokenInfo = null;
  if (data) {
    tokenInfo = data[contract_addr]?.contractQuery || null;
    dataHasError = !!data[contract_addr]?.contractQuery?.error;
  }

  return {
    tokenInfo,
    isLoading,
    hasError: isError || dataHasError,
  };
};
