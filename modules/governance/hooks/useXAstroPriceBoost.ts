import { useMemo } from "react";
import { useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";
import { useContracts } from "modules/common";

export const useXAstroPriceBoost = (): number | null => {
  const { client } = useTerraWebapp();
  const { staking } = useContracts();

  const { data: totalShares } = useQuery(["total_shares", staking], () => {
    return client.wasm.contractQuery(staking, {
      total_shares: {},
    });
  });

  const { data: totalDeposit } = useQuery(["total_deposit", staking], () => {
    return client.wasm.contractQuery(staking, {
      total_deposit: {},
    });
  });

  return useMemo(() => {
    if (!totalShares || !totalDeposit) {
      return null;
    }

    return Number(totalShares) / Number(totalDeposit);
  }, [totalShares, totalDeposit]);
};
