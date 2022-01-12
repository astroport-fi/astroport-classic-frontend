import { useMemo } from "react";
import { num } from "@arthuryeti/terra";

import { useUserInfo2 } from "modules/airdrop";

export const useAirdrop2StillClaimable = () => {
  const userInfo = useUserInfo2();

  return useMemo(() => {
    if (userInfo == null) {
      return 0;
    }

    return num(userInfo.airdrop_amount).eq(0) && !userInfo.tokens_withdrawn;
  }, [userInfo]);
};

export default useAirdrop2StillClaimable;
