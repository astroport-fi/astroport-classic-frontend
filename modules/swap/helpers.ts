import { num } from "@arthuryeti/terra";

type minAmountReceiveParams = {
  amount: string;
  maxSpread: string;
};

export const minAmountReceive = ({
  amount,
  maxSpread,
}: minAmountReceiveParams): string => {
  const rate1 = num("1").minus(maxSpread);
  const rate2 = num("1").minus("0.003"); // astroswap commission

  return num(amount).times(rate1).times(rate2).toString();
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
