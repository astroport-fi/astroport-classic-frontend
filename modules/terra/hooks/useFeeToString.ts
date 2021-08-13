import { useMemo } from "react";
import { Coins } from "@terra-money/terra.js";
import { useTerra } from "contexts/TerraContext";
import { coinsToString } from "modules/terra";

export const useFeeToString = (fee: Coins | null) => {
  const { tokens } = useTerra();

  return useMemo(() => {
    if (!(fee && tokens)) {
      return null;
    }

    return coinsToString(fee, tokens);
  }, [fee, tokens]);
};

export default useFeeToString;
