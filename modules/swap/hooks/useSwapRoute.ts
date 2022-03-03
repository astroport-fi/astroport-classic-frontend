import { useMemo } from "react";

import { Route, getSwapRoute, TokenGraphAdjacencyList } from "modules/common";

type Params = {
  tokenGraph: TokenGraphAdjacencyList | null;
  from: string | null;
  to: string | null;
};

export const useSwapRoute = ({
  tokenGraph,
  from,
  to,
}: Params): Route[] | null => {
  return useMemo(() => {
    return getSwapRoute({ tokenGraph, from, to });
  }, [tokenGraph, from, to]);
};

export default useSwapRoute;
