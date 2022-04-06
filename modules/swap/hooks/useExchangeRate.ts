import { useAstroswap, useTokenInfo } from "modules/common";
import numeral from "numeral";
import { useMemo } from "react";
import { useSwapRoute } from "./useSwapRoute";
import { useSwapSimulate } from "./useSwapSimulate";

const useExchangeRate = (
  token1: string,
  token2: string,
  terraAmount1: string,
  terraAmount2: string,
  reverse: boolean,
  price: string | null
): string | null => {
  const { getSymbol } = useTokenInfo();
  const { tokenGraph } = useAstroswap();

  const swapRoute = useSwapRoute({
    tokenGraph,
    from: token2,
    to: token1,
  });

  const simulated = useSwapSimulate({
    swapRoute,
    amount: reverse ? terraAmount2 : terraAmount1,
    token: reverse ? token1 : token2,
    token2: reverse ? token2 : token1,
    reverse: reverse,
  });

  return useMemo(() => {
    const format = (value: string) =>
      numeral(value).format("0,0.00[000]").toString();

    if (price === null) {
      return null;
    }

    const useUusdOrUluna =
      token1 === "uusd" ||
      token1 === "uluna" ||
      token2 === "uusd" ||
      token2 === "uluna";

    // use current price
    if (
      token1 === "uusd" ||
      (token1 === "uluna" && token2 !== "uusd") ||
      !useUusdOrUluna
    ) {
      return `1 ${getSymbol(token2)} = ${format(price)} ${getSymbol(token1)}`;
    }

    if (simulated.isLoading || simulated.price === null) {
      return null;
    }

    // use inverted simulation price
    if (token2 === "uusd" || (token2 === "uluna" && token1 !== "uusd")) {
      return `1 ${getSymbol(token1)} = ${format(simulated.price)} ${getSymbol(
        token2
      )}`;
    }

    return `1 ${getSymbol(token2)} = ${format(price)} ${getSymbol(token1)}`;
  }, [simulated.isLoading, simulated.price, price]);
};

export default useExchangeRate;
