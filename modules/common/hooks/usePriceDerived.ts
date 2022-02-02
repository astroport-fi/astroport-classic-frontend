import { useMemo } from "react";
import { useTokenPrices } from "modules/common";

export const usePriceDerived = (token: string) => {
  const prices = useTokenPrices();

  return useMemo(() => {
    if (!prices[token]) {
      return 0;
    }

    return prices[token];
  }, [prices]);
};

export default usePriceDerived;
