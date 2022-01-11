import { useMemo } from "react";
import { num, useAddress, useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

import { useContracts } from "modules/common";

export const useLockedLpAmount = (
  lpTokenContract: string,
  duration: number
): number => {
  const address = useAddress();
  const { lockdrop } = useContracts();
  const { client } = useTerraWebapp();

  const { data: info } = useQuery(
    ["lockedLpAmount", lpTokenContract, duration, address],
    () => {
      return client.wasm.contractQuery<{ astroport_lp_units: string }>(
        lockdrop,
        {
          lock_up_info: {
            terraswap_lp_token: lpTokenContract,
            duration,
            user_address: address,
          },
        }
      );
    }
  );

  return useMemo(() => {
    if (info == null) {
      return 0;
    }

    return num(info.astroport_lp_units)
      .div(10 ** 6)
      .dp(6)
      .toNumber();
  }, [info]);
};

export default useLockedLpAmount;
