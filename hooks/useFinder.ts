import { useCallback } from "react";
import { useTerraWebapp } from "@arthuryeti/terra";

import { FINDER } from "constants/constants";

const useFinder = () => {
  const {
    network: { chainID },
  } = useTerraWebapp();

  return useCallback(
    (address: string, path: string = "account") => {
      return `${FINDER}/${chainID}/${path}/${address}`;
    },
    [chainID]
  );
};

export default useFinder;
