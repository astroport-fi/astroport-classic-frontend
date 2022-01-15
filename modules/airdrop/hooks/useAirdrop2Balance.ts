import { useMemo } from "react";
import { num, useAddress } from "@arthuryeti/terra";

import { useAirdrop, useUserInfo2 } from "modules/airdrop";
import { ONE_TOKEN } from "constants/constants";

export const useAirdrop2Balance = () => {
  const address = useAddress();
  // const { isLoading, data } = useAirdrop(address);
  const { isLoading, data } = useAirdrop(address);
  const userInfo = useUserInfo2();

  const airdrop = useMemo(() => {
    if (data == null) {
      return null;
    }

    return data.find(({ airdrop_series }) => airdrop_series === 2);
  }, [data]);

  return useMemo(() => {
    if (userInfo == null || isLoading == null) {
      return 0;
    }

    if (airdrop == null) {
      return 0;
    }

    if (userInfo.tokens_withdrawn) {
      return 0;
    }

    if (num(userInfo.airdrop_amount).eq(0)) {
      return num(airdrop.amount).div(ONE_TOKEN).dp(6).toNumber();
    }

    return num(userInfo.airdrop_amount)
      .minus(userInfo.delegated_amount)
      .div(ONE_TOKEN)
      .dp(6)
      .toNumber();
  }, [userInfo, airdrop]);
};

export default useAirdrop2Balance;
