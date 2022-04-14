import { useMemo } from "react";
import { num, useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";
import { QUERY_STALE_TIME } from "constants/constants";
import { useContracts } from "modules/common";

export const useAstroMintRatio = (): number | null => {
  const { client } = useTerraWebapp();
  const { staking } = useContracts();

  const { data: totalShares } = useQuery(
    ["total_shares", staking],
    () => {
      return client.wasm.contractQuery(staking, {
        total_shares: {},
      });
    },
    {
      staleTime: QUERY_STALE_TIME,
    }
  );

  const { data: totalDeposit } = useQuery(
    ["total_deposit", staking],
    () => {
      return client.wasm.contractQuery(staking, {
        total_deposit: {},
      });
    },
    {
      staleTime: QUERY_STALE_TIME,
    }
  );

  return useMemo(() => {
    if (!totalShares || !totalDeposit) {
      return null;
    }

    if (totalShares > 0 && totalDeposit > 0) {
      return num(Number(totalShares) / Number(totalDeposit)).toNumber();
    } else {
      return 1;
    }
  }, [totalShares, totalDeposit]);
};
