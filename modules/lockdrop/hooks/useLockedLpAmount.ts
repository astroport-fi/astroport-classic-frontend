import { useMemo } from "react";

import { useUserInfo } from "modules/lockdrop";
import { num } from "@arthuryeti/terra";

export const useLockedLpAmount = (
  lpTokenContract: string,
  duration: number
): number => {
  const userInfo = useUserInfo();

  return useMemo(() => {
    if (userInfo == null) {
      return 0;
    }

    const info = userInfo.lockup_infos.find((info) => {
      return (
        info.astroport_lp_token === lpTokenContract &&
        info.duration === duration
      );
    });

    if (info == null) {
      return 0;
    }

    return num(info.astroport_lp_units)
      .div(10 ** 6)
      .dp(6)
      .toNumber();
  }, [userInfo, lpTokenContract]);
};

export default useLockedLpAmount;
