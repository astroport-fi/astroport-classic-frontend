import { useCallback } from "react";
import { useTerraWebapp } from "@arthuryeti/terra";

import { FINDER, CHAIN_TO_FINDER_INFO } from "constants/constants";

const useFinder = () => {
  const {
    network: { chainID },
  } = useTerraWebapp();

  return useCallback(
    (address: string, path: string = "account") => {
      return `${FINDER}/${CHAIN_TO_FINDER_INFO[chainID]}/${path}/${address}`;
    },
    [chainID]
  );
};

export default useFinder;
