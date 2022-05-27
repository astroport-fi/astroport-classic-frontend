import { useMemo } from "react";
import { useTerraWebapp } from "context/TerraWebappContext";
import { useQuery } from "react-query";
import { QUERY_STALE_TIME } from "constants/constants";
import { useBalance, useContracts } from "modules/common";
import num from "libs/num";

type Response = {
  total_supply: string;
};

export const useGovStakingRatio = () => {
  const { client } = useTerraWebapp();
  const { astroToken, staking } = useContracts();
  const govAstroBalance = useBalance(astroToken, staking);

  const { data, isLoading } = useQuery(
    ["supply", astroToken],
    () => {
      return client.wasm.contractQuery<Response>(astroToken, {
        token_info: {},
      });
    },
    {
      staleTime: QUERY_STALE_TIME,
    }
  );

  return useMemo(() => {
    if (data == null) {
      return 0;
    }

    const total = num(data.total_supply)
      .div(10 ** 6)
      .dp(6)
      .toNumber();
    const staked = num(govAstroBalance)
      .div(10 ** 6)
      .dp(6)
      .toNumber();

    return num((staked * 100) / total).toNumber();
  }, [data, govAstroBalance, isLoading]);
};
