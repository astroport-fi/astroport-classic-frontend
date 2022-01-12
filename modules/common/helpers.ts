import numeral from "numeral";
import { num } from "@arthuryeti/terra";

import {
  findAsset,
  getTokenDenoms,
  getTokenDenom,
  PairResponse,
  Route,
} from "modules/common";

export const formatBigNumbers = (value: Number): String => {
  if (value < 1000000) {
    return numeral(value).format("0,0.000[000]");
  }

  return numeral(value).format("0.00a", Math.floor).toUpperCase();
};

// const formatPair = (
//   routes: Routes,
//   pair: PairResponse,
//   from: AssetInfo,
//   to: AssetInfo,
// ) => {
//   const [tokenFrom, tokenTo] = getTokenDenoms([from, to]);

//   const prevPairs = routes[tokenFrom] || {};

//   return {
//     [tokenFrom]: {
//       ...prevPairs,
//       [tokenTo]: pair,
//     },
//   };
// };

// export const formatPairsToRoutes = (pairs: PairResponse[]): Routes => {
//   return pairs.reduce((routes, pair) => {
//     const [tokenFirst, tokenSecond] = pair.asset_infos;

//     return {
//       ...routes,
//       ...formatPair(routes, pair, tokenFirst, tokenSecond),
//       ...formatPair(routes, pair, tokenSecond, tokenFirst),
//     };
//   }, {});
// };

export const handleTinyAmount = (
  value: string | number,
  format: string = "0,0.00"
) => {
  if (num(value).lt(0.01) && num(value).gt(0)) {
    return " < 0.01";
  } else {
    return numeral(value).format(format);
  }
};

export const toRoutes = (
  allPairs: PairResponse[],
  r: PairResponse[],
  parentFrom: string | null,
  parentTo: string | null,
  parentContracts: string[],
  index?: number
): Route[] => {
  return r.map((v) => {
    const { contract_addr, asset_infos, pair_type } = v;
    const [token1, token2] = getTokenDenoms(asset_infos);

    const newParentContracts = [...parentContracts, contract_addr];

    const from: string = parentTo ? parentTo : index == 0 ? token1 : token2;
    const to: string = from === token1 ? token2 : token1;

    const children = allPairs
      .filter((pair) => {
        return findAsset(pair.asset_infos, to);
      })
      .filter((pair) => {
        return pair.asset_infos.find((asset) => {
          return (
            getTokenDenom(asset) !== parentFrom &&
            getTokenDenom(asset) !== parentTo
          );
        });
      })
      .filter((pair) => {
        return (
          pair.contract_addr !== contract_addr &&
          !newParentContracts.includes(pair.contract_addr)
        );
      });

    return {
      contract_addr,
      type: Object.keys(pair_type)[0],
      from,
      to,
      children: toRoutes(allPairs, children, from, to, newParentContracts),
    };
  });
};

export const formatPairsToRoutes = (pairs: PairResponse[]): Route[] => {
  return [
    ...toRoutes(pairs, pairs, null, null, [], 0),
    ...toRoutes(pairs, pairs, null, null, [], 1),
  ];
};
