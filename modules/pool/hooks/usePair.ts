import { useMemo } from "react";
import { useTerra } from "@arthuryeti/terra";

export const usePair = (contract: string) => {
  const { pairs } = useTerra();

  const pair = useMemo(() => {
    return pairs.find((v) => {
      v.lpToken === contract;
    });
  }, [contract, pairs]);

  return {
    pair,
  };
};

export default usePair;
