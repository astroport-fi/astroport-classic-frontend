import { useMemo } from "react";
import { num, useBalance, useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

import { useContracts } from "modules/common";

type GovRatiosResponse = {
  stakingRatio: number;
  astroToXRatio: number;
  xToAstroRatio: number;
};

type Response = {
  total_supply: string;
};

export const useGovRatios = (): GovRatiosResponse => {
  const { client } = useTerraWebapp();
  const { astroToken, xAstroToken, staking } = useContracts();
  const govAstroBalance = useBalance(astroToken, staking);

  const { data, isLoading } = useQuery(["supply", astroToken], () => {
    return client.wasm.contractQuery<Response>(astroToken, {
      token_info: {},
    });
  });

  const { data: dataxAstro, isLoading: isLoadingXAstro } = useQuery(
    ["supply", xAstroToken],
    () => {
      return client.wasm.contractQuery<Response>(xAstroToken, {
        token_info: {},
      });
    }
  );

  return useMemo(() => {
    if (data == null || dataxAstro == null) {
      return {
        stakingRatio: 0,
        astroToXRatio: 0,
        xToAstroRatio: 0,
      };
    }

    const totalAstro = num(data.total_supply)
      .div(10 ** 6)
      .dp(6)
      .toNumber();

    const totalxAstro = num(dataxAstro.total_supply)
      .div(10 ** 6)
      .dp(6)
      .toNumber();

    const staked = num(govAstroBalance)
      .div(10 ** 6)
      .dp(6)
      .toNumber();

    return {
      stakingRatio: num((staked * 100) / totalAstro).toNumber(),
      astroToXRatio: num((totalAstro * 100) / totalxAstro).toNumber(),
      xToAstroRatio: num((totalxAstro * 100) / totalAstro).toNumber(),
    };
  }, [data, dataxAstro, govAstroBalance, isLoading, isLoadingXAstro]);
};
