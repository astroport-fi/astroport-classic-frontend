import num from "libs/num";
import { ONE_TOKEN } from "constants/constants";

type minAmountReceiveParams = {
  amount: string;
  maxSpread: string;
};

export const minAmountReceive = ({
  amount,
  maxSpread,
}: minAmountReceiveParams): number => {
  const rate = num(1).minus(maxSpread);

  return num(amount).times(rate).times(ONE_TOKEN).dp(0).toNumber();
};
