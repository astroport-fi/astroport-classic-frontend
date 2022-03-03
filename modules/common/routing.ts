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

type UnvisitedNodes = {
  [token: string]: {
    token: string;
    route: PairResponse[] | null;
  };
};

// Implementation of Dijkstra's algorithm
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

  const unvisited: UnvisitedNodes = Object.fromEntries(
    Object.keys(tokenGraph).map((token) => [
      token,
      {
        token,
        route: null,
      },
    ])
  );

  unvisited[from].route = [];

  // Begin with from token's node
  let currentNode = unvisited[from];

  do {
    // Look at all unvisited neighbors of current node,
    // and update route to it if it's shorter to route through the current node
    tokenGraph[currentNode.token].forEach((neighbor) => {
      const neighborNode = unvisited[neighbor.token];

      if (neighborNode) {
        const distance = currentNode.route.length + 1;

        if (
          neighborNode.route == null ||
          distance < neighborNode.route.length
        ) {
          neighborNode.route = [...currentNode.route, neighbor.pair];
        }
      }
    });

    delete unvisited[currentNode.token];

    // Select next node by finding node with shortest route
    currentNode = Object.values(unvisited).reduce((selectedNode, node) =>
      selectedNode.route == null ||
      node.route?.length < selectedNode.route?.length
        ? node
        : selectedNode
    );

    // If the next node doesn't have a route, then we could not find a route,
    // just return null
    if (currentNode.route == null) {
      return null;
    }

    // If the next node is the "to" node, there's no need to visit it,
    // we've found our most efficient route
    if (currentNode.token == to) {
      return pairsToRoute(currentNode.route, from);
    }
  } while (true);
};
