import { Pair } from "types/common";

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

export const findSwapRoute = (routes: any, from: string, to: string) => {
  if (!routes[from]) {
    return null;
  }

  if (routes[from]["usdr"] && routes["usdr"][to]) {
    return [routes[from]["usdr"], routes["usdr"][to]];
  }

  if (routes[from][to]) {
    return [routes[from][to]];
  }

  if (routes[from]["uusd"] && routes["uusd"][to]) {
    return [routes[from]["uusd"], routes["uusd"][to]];
  }

  if (routes[from]["uluna"] && routes["uluna"][to]) {
    return [routes[from]["uluna"], routes["uluna"][to]];
  }

  if (routes[from]["uluna"] && routes["uusd"][to]) {
    return [routes[from]["uluna"], routes["uluna"]["uusd"], routes["uusd"][to]];
  }

  return [routes[from]["uusd"], routes["uusd"]["uluna"], routes["uluna"][to]];
};

export const swapRouteToString = (
  from: string,
  routes: Pair[],
  tokens: any
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
