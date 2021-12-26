import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { useTerraWebapp } from "@arthuryeti/terra";

import { FeeResponse, useContracts } from "modules/common";

export const usePoolFee = (pairType: string) => {
  const { client } = useTerraWebapp();
  const { factory } = useContracts();

  const { data, isLoading } = useQuery(
    ["pair", pairType],
    () => {
      if (pairType == null) {
        throw new Error("pairType is null");
      }

      return client.wasm.contractQuery<FeeResponse>(factory, {
        fee_info: {
          pair_type: {
            [pairType]: {},
          },
        },
      });
    },
    {
      refetchOnWindowFocus: false,
      enabled: pairType != null,
    }
  );

  return useMemo(() => {
    if (isLoading || data == null) {
      return 0;
    }

    if (data != null) {
      return data.total_fee_bps;
    }
  }, [data, isLoading]);
};

export default usePoolFee;
