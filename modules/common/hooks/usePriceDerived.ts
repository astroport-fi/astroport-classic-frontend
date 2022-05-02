import { useMemo } from "react";
import { useTokenPrices } from "modules/common";

export const usePriceDerived = (token: string) => {
  const prices: any = useTokenPrices();

  return useMemo(() => {
    if (token === "uusd") {
      return 1;
    }

    if (!prices[token]) {
      return 0;
    }

    return prices[token];
  }, [prices]);
};

export default usePriceDerived;
