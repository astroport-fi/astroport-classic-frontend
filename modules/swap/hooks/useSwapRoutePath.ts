import { Route, useTokenInfo } from "modules/common";

export const useSwapRoutePath = (routes: Route[], separator = "→"): string => {
  const { getSymbol } = useTokenInfo();

  const tokens = [routes[0].from, ...routes.map(({ to }) => to)];
  return tokens.map(getSymbol).join(separator);
};

export default useSwapRoutePath;
