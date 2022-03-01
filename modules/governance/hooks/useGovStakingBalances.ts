import { useCallback, useMemo } from "react";
import { useAddress, useTerraWebapp } from "@arthuryeti/terra";
import { useContracts } from "modules/common";
import { useQuery } from "react-query";

type Response = {
  balance: string;
};

type BalanceReturns = {
  astroBalance: string | null;
  xAstroBalance: string | null;
  stakedAstroBalance: string | null;
};

export const useGovStakingBalances = (): BalanceReturns => {
  const { client } = useTerraWebapp();
  const address = useAddress();
  const { astroToken, xAstroToken, staking } = useContracts();

  const { data: astroBalance } = useQuery(
    ["balance", astroToken, address],
    () => {
      return client.wasm.contractQuery<Response>(astroToken, {
        balance: {
          address,
        },
      });
    }
  );

  const { data: xAstroBalance } = useQuery(
    ["balance", xAstroToken, address],
    () => {
      return client.wasm.contractQuery<Response>(xAstroToken, {
        balance: {
          address,
        },
      });
    }
  );

  const { data: stakedAstroBalance } = useQuery(
    ["balance", astroToken, staking],
    () => {
      return client.wasm.contractQuery<Response>(astroToken, {
        balance: {
          address: staking,
        },
      });
    }
  );

  return {
    astroBalance: astroBalance?.balance,
    xAstroBalance: xAstroBalance?.balance,
    stakedAstroBalance: stakedAstroBalance?.balance,
  };
};
