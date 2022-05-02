import { useMemo } from "react";
import num from "libs/num";
import { Fee } from "@terra-money/terra.js";
import { useBalance, useTokenInfo } from "modules/common";

export const useNotEnoughUSTBalanceToPayFees = (fee?: Fee) => {
  const token = "uusd";
  const { getDecimals } = useTokenInfo();
  const balance = useBalance(token) || 0;
  const tokenBalance = num(balance)
    .div(10 ** getDecimals(token))
    .dp(5)
    .toNumber();

  // todo: requires to pass fee in any useNotEnoughUSTBalanceToPayFees calls, now it has fallback to 0
  const feeToken = fee?.amount.get(token);
  const feeInt = feeToken ? feeToken.amount.toString() : "0";
  const formatedFee = num(feeInt)
    .div(10 ** getDecimals(token))
    .dp(5)
    .toNumber();

  return useMemo(() => {
    return num(tokenBalance).lt(formatedFee);
  }, [tokenBalance]);
};

export default useNotEnoughUSTBalanceToPayFees;
