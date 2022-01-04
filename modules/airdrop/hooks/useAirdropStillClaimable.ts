import { useMemo } from "react";
import { num, useAddress } from "@arthuryeti/terra";

import { useAirdrop, useUserInfo } from "modules/airdrop";
import { ONE_TOKEN } from "constants/constants";

export const useAirdropStillClaimable = () => {
  const userInfo = useUserInfo();

  return useMemo(() => {
    if (userInfo == null) {
      return 0;
    }

    return num(userInfo.airdrop_amount).eq(0) && !userInfo.tokens_withdrawn;
  }, [userInfo]);
};

export default useAirdropStillClaimable;
