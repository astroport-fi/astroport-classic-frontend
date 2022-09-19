import { useQuery } from "react-query";
import request, { gql } from "graphql-request";
import { useTerraWebapp } from "context/TerraWebappContext";
import { useHiveEndpoint } from "./useHive";

interface TokenInfos {
  [contractAddr: string]: TokenInfo;
}

interface TokenInfo {
  decimals: number;
  name: string;
  symbol: string;
  total_supply: string;
  error?: string;
}

type GetTokensResponse = {
  tokenInfos: TokenInfos;
  isLoading: boolean;
  hasError: boolean;
};

type TokenInfoContractQueryResponse = {
  [contractAddr: string]: {
    contractQuery: TokenInfo;
  };
};

const buildQuery = (tokens: string[]) => gql`
  {
    ${tokens.map(
      (token) => `
      ${token}: wasm {
        contractQuery(
          contractAddress: "${token}"
          query: {
            token_info: {}
          }
        )
      }
    `
    )}
  }
`;

export const useGetTokens = (tokens: string[]): GetTokensResponse => {
  const {
    network: { chainID },
  } = useTerraWebapp();

  const { hiveEndpoint, fallbackHiveEndpoint } = useHiveEndpoint();
  let firstAttempt = true;

  const { data, isLoading, isError } = useQuery<TokenInfoContractQueryResponse>(
    [hiveEndpoint, chainID, "tokens", tokens],
    async () => {
      const url = firstAttempt ? hiveEndpoint : fallbackHiveEndpoint;
      firstAttempt = false;
      return request(url, buildQuery(tokens));
    },
    {
      refetchOnWindowFocus: false,
      enabled: tokens && tokens.length > 0,
      retry: 1,
    }
  );

  let dataHasError = false;
  let tokenInfos: TokenInfos = {};
  if (data) {
    Object.entries(data).forEach(([address, token]) => {
      if (!token.contractQuery?.error) {
        tokenInfos[address] = token.contractQuery;
      } else {
        dataHasError = true;
      }
    });
  }

  return {
    tokenInfos,
    isLoading,
    hasError: isError || dataHasError,
  };
};
