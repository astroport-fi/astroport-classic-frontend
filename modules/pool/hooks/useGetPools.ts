import { useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";
import { gql, request } from "graphql-request";
import { PoolResponse, useHiveEndpoint } from "modules/common";
import { QUERY_STALE_TIME } from "constants/constants";
import { useMemo } from "react";

const createQuery = (contracts) => {
  return gql`
      {
        ${contracts.map((contract_addr) => {
          return `
            ${contract_addr}: wasm {
              contractQuery(
                contractAddress: "${contract_addr}"
                query: {
                  pool: { }
                }
              )
            }
          `;
        })}
      }
  `;
};

const useGetPools = (contracts: (string | null)[]): PoolResponse[] => {
  const { hiveEndpoint, fallbackHiveEndpoint } = useHiveEndpoint();

  const queryBuilder = createQuery(contracts);
  let firstAttempt = true;
  const { data } = useQuery(
    ["pools", contracts],
    () => {
      const url = firstAttempt ? hiveEndpoint : fallbackHiveEndpoint;
      firstAttempt = false;
      return request(url, queryBuilder);
    },
    {
      refetchOnWindowFocus: false,
      enabled: contracts.filter((c) => c === null).length === 0,
      staleTime: QUERY_STALE_TIME,
      retry: 1,
    }
  );

  return useMemo((): PoolResponse[] => {
    if (data == null) {
      return [];
    }

    return contracts.map(
      (contract_addr): PoolResponse => data[contract_addr].contractQuery
    );
  }, [contracts, data]);
};

export default useGetPools;
