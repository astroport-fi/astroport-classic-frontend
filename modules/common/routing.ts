import { PairResponse, Route } from "modules/common/types";
import { getTokenDenom, getTokenDenoms } from "modules/common/asset";

type TokenGraphEdge = {
  pair: PairResponse;
  token: string;
};

export type TokenGraphAdjacencyList = {
  [token: string]: Set<TokenGraphEdge>;
};

type GetSwapRouteOpts = {
  tokenGraph: TokenGraphAdjacencyList | null;
  from: string | null;
  to: string | null;
};

// Given an array of pairs, returns an object
// with a key for every unique token across all pairs,
// each with a Set value of objects for each pair the key token is in,
// containing the pair object and the token on the other side of the pair.
// In graph theory terminology, this is an adjacency list.
// There's an entry for each node with a Set of neighboring nodes/edges.
export const pairsToGraph = (
  pairs: PairResponse[]
): TokenGraphAdjacencyList => {
  const adjacencyList = {};

  for (const pair of pairs) {
    for (const asset of pair.asset_infos) {
      const token = getTokenDenom(asset);
      adjacencyList[token] ||= new Set<TokenGraphEdge>();

      const otherToken = getTokenDenom(
        pair.asset_infos.find((otherAsset) => otherAsset != asset)
      );

      // Add edge
      adjacencyList[token].add({
        pair,
        token: otherToken,
      });
    }
  }

  return adjacencyList;
};

// Given an array of pairs, returns a Route array,
// with "to" token of each Route matching the "from"
// token of the next Route.
// e.g. FOO/UST, BAR/UST becomes FOO/UST -> UST/BAR
const pairsToRoute = (pairs: PairResponse[], from: string) => {
  return pairs.reduce<Route[]>((routes, pair, i) => {
    const tokens = getTokenDenoms(pair.asset_infos);

    const previousTo = i == 0 ? from : routes[i - 1].to;

    if (tokens[0] != previousTo) {
      tokens.reverse();
    }

    return [
      ...routes,
      {
        from: tokens[0],
        to: tokens[1],
        contract_addr: pair.contract_addr,
        type: Object.keys(pair.pair_type)[0],
      },
    ];
  }, []);
};

type EnqueuedSearchNode = {
  token: string;
  pairs: PairResponse[];
};

// Breadth-first search for shortest route between two tokens
// Given a token graph (in the form of an adjacency list),
// finds the shortest route between two token nodes.
export const getSwapRoute = ({
  tokenGraph,
  from,
  to,
}: GetSwapRouteOpts): Route[] | null => {
  if (
    tokenGraph == null ||
    from == null ||
    to == null ||
    !tokenGraph.hasOwnProperty(from) ||
    !tokenGraph.hasOwnProperty(to)
  ) {
    return null;
  }

  if (from == to) {
    return [];
  }

  const queue: EnqueuedSearchNode[] = [{ token: from, pairs: [] }];
  const visited = new Set<string>(from);

  while (queue.length > 0) {
    const node = queue.shift();

    for (const neighbor of Array.from(tokenGraph[node.token])) {
      const pairs = [...node.pairs, neighbor.pair];

      if (neighbor.token == to) {
        return pairsToRoute(pairs, from);
      }

      if (!visited.has(neighbor.token)) {
        visited.add(neighbor.token);
        queue.push({ token: neighbor.token, pairs });
      }
    }
  }

  return null;
};
