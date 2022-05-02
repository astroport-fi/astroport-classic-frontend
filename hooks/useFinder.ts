import { useCallback } from "react";
import { useTerraWebapp } from "context/TerraWebappContext";

import { FINDER, CHAIN_TO_FINDER_INFO } from "constants/constants";

const useFinder = () => {
  const {
    network: { chainID },
  } = useTerraWebapp();

  return useCallback(
    (address: string, path: string = "account") => {
      // @ts-ignore
      return `${FINDER}/${CHAIN_TO_FINDER_INFO[chainID]}/${path}/${address}`;
    },
    [chainID]
  );
};

export default useFinder;
