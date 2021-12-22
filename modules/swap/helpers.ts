import { num } from "@arthuryeti/terra";
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

  return num(amount).times(rate).dp(6).toNumber();
};

type PriceImpactParams = {
  offerAmount: string;
  maxSpread: string;
};

export const priceImpact = ({
  offerAmount,
  maxSpread,
}: PriceImpactParams): string => {
  const amount = num(offerAmount);
  const spread = num(maxSpread);

  return spread.div(amount.plus(spread)).times("100").toString();
};
