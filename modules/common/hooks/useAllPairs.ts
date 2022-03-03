import { gql, request } from "graphql-request";
import {
  PairResponse,
  pairsToGraph,
  useContracts,
  useHiveEndpoint,
} from "modules/common";
import { useQuery } from "react-query";

const query = gql`
  query FetchAllPairs($factory: String!, $startAfter: JSON) {
    wasm {
      contractQuery(
        contractAddress: $factory
        query: { pairs: { limit: 30, start_after: $startAfter } }
      )
    }
  }
`;

export type UseAllPairs = {
  pairs: PairResponse[] | undefined;
  isLoading: boolean;
  isError: boolean;
};

export const useAllPairs = (): UseAllPairs => {
  const hiveEndpoint = useHiveEndpoint();
  const { factory } = useContracts();

  const {
    data: pairs,
    isLoading,
    isError,
  } = useQuery(
    [hiveEndpoint, "pairs"],
    async () => {
      const pairs = [];

      // Fetch pairs in sequential 30 pair chunks (contract max)
      // until there aren't any more, then return them all.
      while (true) {
        const response = await request(hiveEndpoint, query, {
          factory,
          startAfter: pairs[pairs.length - 1]?.asset_infos,
        });

        const pairsInPage = response.wasm.contractQuery.pairs;

        if (pairsInPage.length === 0) {
          return pairs;
        }

        pairs.push(...pairsInPage);
      }
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return {
    pairs,
    isLoading,
    isError,
  };
};
