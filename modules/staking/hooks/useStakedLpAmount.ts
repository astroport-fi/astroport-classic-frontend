import { useMemo } from "react";
import { useAddress, useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

import { LpDepositResponse, useContracts } from "modules/common";

export const useStakedLpAmount = (lpTokenContract: string): string => {
  const address = useAddress();
  const { generator } = useContracts();
  const { client } = useTerraWebapp();

  const { data } = useQuery(
    ["stakedLpAmount", lpTokenContract, address],
    () => {
      return client.wasm.contractQuery<LpDepositResponse>(generator, {
        deposit: {
          lp_token: lpTokenContract,
          user: address,
        },
      });
    }
  );

  return useMemo(() => {
    if (data == null) {
      return "0";
    }

    return data;
  }, [data]);
};

export default useStakedLpAmount;
