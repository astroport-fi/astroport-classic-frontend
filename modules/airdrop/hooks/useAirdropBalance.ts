import { useMemo } from "react";
import { num, useAddress } from "@arthuryeti/terra";

import { useAirdrop, useUserInfo } from "modules/airdrop";

export const useAirdropBalance = () => {
  const address = useAddress();
  const { isLoading, data } = useAirdrop(address);
  const userInfo = useUserInfo();

  return useMemo(() => {
    if (userInfo == null || isLoading == null) {
      return null;
    }

    if (data == null) {
      return "0";
    }

    if (num(userInfo.airdrop_amount).eq(0)) {
      return data.amount;
    }

    return num(userInfo.airdrop_amount)
      .minus(userInfo.delegated_amount)
      .toString();
  }, [userInfo, data, isLoading]);
};

export default useAirdropBalance;
