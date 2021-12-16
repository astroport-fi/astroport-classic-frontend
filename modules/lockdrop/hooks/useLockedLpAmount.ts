import { useMemo } from "react";

import { useUserInfo } from "modules/lockdrop";

export const useLockedLpAmount = (
  lpTokenContract: string,
  duration: number
): string => {
  const userInfo = useUserInfo();

  return useMemo(() => {
    if (userInfo == null) {
      return "0";
    }

    const info = userInfo.lockup_infos.find((info) => {
      return (
        info.terraswap_lp_token === lpTokenContract &&
        info.duration === duration
      );
    });

    if (info == null) {
      return "0";
    }

    return info.lp_units_locked;
  }, [userInfo, lpTokenContract]);
};

export default useLockedLpAmount;
