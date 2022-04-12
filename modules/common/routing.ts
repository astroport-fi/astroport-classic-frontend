import { Route } from "modules/common/types";
import { getTokenDenom, getTokenDenoms } from "modules/common/asset";
import { Pool } from "modules/common";

type TokenGraphEdge = {
  pool: Pool;
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

// Given an array of pools, returns an object
// with a key for every unique token across all pools,
// each with a Set value of objects for each pool the key token is in,
// containing the pool object and the token on the other side of the pool.
// In graph theory terminology, this is an adjacency list.
// There's an entry for each node with a Set of neighboring nodes/edges.
export const poolsToGraph = (pools: Pool[]): TokenGraphAdjacencyList => {
  const adjacencyList: any = {};

  for (const pool of pools) {
    for (const asset of pool.assets) {
      const token = getTokenDenom(asset);
      adjacencyList[token] ||= new Set<TokenGraphEdge>();

      const otherToken = getTokenDenom(
        pool.assets.find((otherAsset) => otherAsset != asset)
      );

      // Add edge
      adjacencyList[token].add({
        pool,
        token: otherToken,
      });
    }
  }

  return adjacencyList;
};

// Given an array of pools, returns a Route array,
// with "to" token of each Route matching the "from"
// token of the next Route.
// e.g. FOO/UST, BAR/UST becomes FOO/UST -> UST/BAR
const poolsToRoute = (pools: Pool[], from: string) => {
  return pools.reduce<Route[]>((routes: any, pool, i) => {
    const tokens = getTokenDenoms(pool.assets);

    const previousTo = i == 0 ? from : routes[i - 1].to;

    if (tokens[0] != previousTo) {
      tokens.reverse();
    }

    return [
      ...routes,
      {
        from: tokens[0],
        to: tokens[1],
        contract_addr: pool.pool_address,
        type: pool.pool_type,
      },
    ];
  }, []);
};

type EnqueuedSearchNode = {
  token: string;
  pools: Pool[];
};

// Breadth-first search for shortest route between two tokens
// Given a token graph (in the form of an adjacency list),
// finds the shortest route between two token nodes.
export const getSwapRoute = ({
  tokenGraph,
  from,
  to,
}: GetSwapRouteOpts): Route[] => {
  if (
    tokenGraph == null ||
    from == null ||
    to == null ||
    !tokenGraph.hasOwnProperty(from) ||
    !tokenGraph.hasOwnProperty(to)
  ) {
    return [];
  }

  if (from == to) {
    return [];
  }

  const queue: EnqueuedSearchNode[] = [{ token: from, pools: [] }];
  const visited = new Set<string>(from);

  while (queue.length > 0) {
    const node: any = queue.shift();

    // @ts-expect-error
    for (const neighbor of Array.from(tokenGraph[node.token])) {
      const pools = [...node.pools, neighbor.pool];

      if (neighbor.token == to) {
        return poolsToRoute(pools, from);
      }

      if (!visited.has(neighbor.token)) {
        visited.add(neighbor.token);
        queue.push({ token: neighbor.token, pools });
      }
    }
  }

  return [];
};
