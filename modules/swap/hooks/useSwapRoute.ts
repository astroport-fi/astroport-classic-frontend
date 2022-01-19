import { useMemo } from "react";

import { Route, getSwapRoute } from "modules/common";

type Params = {
  routes: Route[] | null;
  from: string | null;
  to: string | null;
};

export const useSwapRoute = ({ routes, from, to }: Params): Route[] | null => {
  return useMemo(() => {
    return getSwapRoute({ routes, from, to });
  }, [routes, from, to]);
};

export default useSwapRoute;
