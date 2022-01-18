import { Route, useTokenInfo } from "modules/common";

export const useSwapRoutePath = (routes: Route[], separator = "→"): any => {
  const { getSymbol } = useTokenInfo();

  if (routes == null || routes.length == 0) {
    return null;
  }

  const tokens = [routes[0].from, ...routes.map(({ to }) => to)];
  const tokensLength = tokens.length;
  const completePath = tokens.map(getSymbol).join(separator);

  let text = completePath;
  let tooltip = null;

  if(tokensLength > 2) {
    text = getSymbol(tokens[0]) + separator + "..." + separator + getSymbol(tokens[tokensLength - 1]);
    tooltip = completePath;
  }

  return {
    text,
    tooltip,
  }
};

export default useSwapRoutePath;
