import { useMemo } from "react";
import { num, useAddress } from "@arthuryeti/terra";

import { useAirdrop, useUserInfo } from "modules/airdrop";
import { ONE_TOKEN } from "constants/constants";

export const useAirdropBalance = () => {
  const address = useAddress();
  const { isLoading, data } = useAirdrop(address);
  const userInfo = useUserInfo();

  return useMemo(() => {
    if (userInfo == null || isLoading == null) {
      return 0;
    }

    if (data == null) {
      return 0;
    }

    if (num(userInfo.airdrop_amount).eq(0)) {
      return num(data.amount).div(ONE_TOKEN).dp(6).toNumber();
    }

    return num(userInfo.airdrop_amount)
      .minus(userInfo.delegated_amount)
      .div(ONE_TOKEN)
      .dp(6)
      .toNumber();
  }, [userInfo, data, isLoading]);
};

export default useAirdropBalance;
