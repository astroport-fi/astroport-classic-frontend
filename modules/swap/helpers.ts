import { Denom } from "@terra-money/terra.js";

import { PairsMap, TokensMap, Pair } from "types/common";
import { getTokenDenoms } from "modules/terra";

export const calculatePriceImpact = (
  amount: number,
  spreadAmount: number
): number => {
  const price = (spreadAmount / (amount + spreadAmount)) * 100;

  return Math.ceil(price * 1000) / 1000;
};

export const calculateMinimumReceive = (amount: string, slippage: string) => {
  return String(Math.floor(Number(amount) - Number(amount) * Number(slippage)));
};

export const findSwapRoute = (
  pairs: any[] | PairsMap,
  from: string,
  to: string
) => {
  if (!pairs[from]) {
    return null;
  }

  if (pairs[from][to]) {
    return [pairs[from][to]];
  }

  if (pairs[from][Denom.USD] && pairs[Denom.USD][to]) {
    return [pairs[from][Denom.USD], pairs[Denom.USD][to]];
  }

  if (pairs[from][Denom.LUNA] && pairs[Denom.LUNA][to]) {
    return [pairs[from][Denom.LUNA], pairs[Denom.LUNA][to]];
  }

  if (pairs[from][Denom.LUNA] && pairs[Denom.USD][to]) {
    return [
      pairs[from][Denom.LUNA],
      pairs[Denom.LUNA][Denom.USD],
      pairs[Denom.USD][to],
    ];
  }

  return [
    pairs[from][Denom.USD],
    pairs[Denom.USD][Denom.LUNA],
    pairs[Denom.LUNA][to],
  ];
};
