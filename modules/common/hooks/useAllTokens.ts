import { useQuery } from "react-query";
import { gql } from "graphql-request";
import { Pool, Tokens, useHiveEndpoint, requestInChunks } from "modules/common";
import { CW20AssetInfo } from "types/common";
import tokenCache from "constants/tokenCache";
import { useTerraWebapp } from "context/TerraWebappContext";
import { QUERY_STALE_TIME } from "constants/constants";

type UseAllTokens = {
  tokens?: Tokens | undefined;
  isLoading: boolean;
  isError: boolean;
};

type NamedTokenInfoResponses = {
  [token: string]: {
    contractQuery: {
      name: string;
      symbol: string;
      decimals: number;
      total_supply: string;
    };
  };
};

const uniqueTokens = (pools: Pool[]): string[] => {
  const tokens = new Set<string>();

  for (const { assets } of pools) {
    for (const asset of assets) {
      const { token } = asset as CW20AssetInfo;

      if (token) {
        tokens.add(token.contract_addr);
      }
    }
  }

  return Array.from(tokens);
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

interface Props {
  pools: Pool[];
}

// TODO: Should we exclude cached tokens that are not part of any pools?
//       If we did, we could get rid of useTokenInfo's isHidden
export const useAllTokens = ({ pools }: Props): UseAllTokens => {
  const {
    network: { chainID },
  } = useTerraWebapp();

  const { hiveEndpoint, fallbackHiveEndpoint } = useHiveEndpoint();
  let firstAttempt = true;
  // @ts-ignore
  const cachedTokens = tokenCache[chainID];

  const {
    data: tokens,
    isLoading,
    isError,
  } = useQuery<Tokens>(
    [hiveEndpoint, "tokens", chainID],
    async () => {
      const url = firstAttempt ? hiveEndpoint : fallbackHiveEndpoint;
      firstAttempt = false;

      const tokensToFetch = uniqueTokens(pools).filter(
        (token) => !(token in cachedTokens)
      );

      if (tokensToFetch.length === 0) {
        return cachedTokens;
      }

      // Request in 100 token chunks to ensure we always stay below request size limits
      const response = await requestInChunks<string, NamedTokenInfoResponses>(
        100,
        url,
        tokensToFetch,
        buildQuery
      );

      const fetchedTokens = Object.entries(response).reduce(
        (
          tokens,
          [
            token,
            {
              contractQuery: { name: protocol, symbol, decimals },
            },
          ]
        ) => ({
          ...tokens,
          [token]: { protocol, symbol, decimals, token },
        }),
        {}
      );

      return {
        ...cachedTokens,
        ...fetchedTokens,
      };
    },
    {
      enabled: pools?.length > 0,
      refetchOnWindowFocus: false,
      staleTime: QUERY_STALE_TIME,
      retry: 1,
    }
  );

  return {
    tokens,
    isLoading,
    isError,
  };
};
