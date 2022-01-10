import { useMemo } from "react";
import { num, useBalance, useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

import { useContracts } from "modules/common";

type Response = {
  total_supply: string;
};

export const useGovStakingRatio = () => {
  const { client } = useTerraWebapp();
  const { astroToken, staking } = useContracts();
  const govAstroBalance = useBalance(astroToken, staking);

  const { data } = useQuery(["supply", astroToken], () => {
    return client.wasm.contractQuery<Response>(astroToken, {
      token_info: {},
    });
  });

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

    return num((staked * 100) / total)
      .dp(4)
      .toNumber();
  }, [data, govAstroBalance]);
};
