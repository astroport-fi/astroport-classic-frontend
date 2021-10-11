import {
  getTokenDenoms,
  PairResponse,
  Routes,
  AssetInfo,
} from "modules/common";

const formatPair = (
  routes: Routes,
  pair: PairResponse,
  from: AssetInfo,
  to: AssetInfo
) => {
  const [tokenFrom, tokenTo] = getTokenDenoms([from, to]);

  const prevPairs = routes[tokenFrom] || {};

  return {
    [tokenFrom]: {
      ...prevPairs,
      [tokenTo]: pair,
    },
  };
};

export const formatPairsToRoutes = (pairs: PairResponse[]): Routes => {
  return pairs.reduce((routes, pair) => {
    const [tokenFirst, tokenSecond] = pair.asset_infos;

    return {
      ...routes,
      ...formatPair(routes, pair, tokenFirst, tokenSecond),
      ...formatPair(routes, pair, tokenSecond, tokenFirst),
    };
  }, {});
};
