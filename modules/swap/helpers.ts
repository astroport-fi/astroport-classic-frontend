import { Denom } from "@terra-money/terra.js";

import { Routes, Tokens, Pair } from "types/common";
import { getTokenDenoms } from "@arthuryeti/terra";

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
  routes: Routes | any[],
  from: string,
  to: string
) => {
  if (!routes[from]) {
    return null;
  }

  if (routes[from][to]) {
    return [routes[from][to]];
  }

  if (routes[from][Denom.USD] && routes[Denom.USD][to]) {
    return [routes[from][Denom.USD], routes[Denom.USD][to]];
  }

  if (routes[from][Denom.LUNA] && routes[Denom.LUNA][to]) {
    return [routes[from][Denom.LUNA], routes[Denom.LUNA][to]];
  }

  if (routes[from][Denom.LUNA] && routes[Denom.USD][to]) {
    return [
      routes[from][Denom.LUNA],
      routes[Denom.LUNA][Denom.USD],
      routes[Denom.USD][to],
    ];
  }

  return [
    routes[from][Denom.USD],
    routes[Denom.USD][Denom.LUNA],
    routes[Denom.LUNA][to],
  ];
};

export const swapRouteToString = (
  from: string,
  routes: Pair[],
  tokens: Tokens | any[]
) => {
  return routes
    .reduce(
      (acc, { asset_infos }) => {
        const [tokenFirst, secondeToken] = getTokenDenoms(asset_infos);

        const nextFrom =
          tokenFirst === acc[acc.length - 1] ? secondeToken : tokenFirst;

        return [...acc, nextFrom];
      },
      [from]
    )
    .map((token) => {
      return tokens[token].symbol;
    })
    .join(" > ");
};
