import { useMemo } from "react";
import { num, useBalance } from "@arthuryeti/terra";

import { useTokenInfo } from "modules/common";

export const useNotEnoughUSTBalanceToPayFees = () => {
  const token = "uusd";
  const { getDecimals } = useTokenInfo();
  const balance = useBalance(token) || 0;
  const tokenBalance = num(balance)
    .div(10 ** getDecimals(token))
    .dp(2)
    .toNumber();

  return useMemo(() => {
    return num(tokenBalance).lt(1);
  }, [tokenBalance]);
};

export default useNotEnoughUSTBalanceToPayFees;
