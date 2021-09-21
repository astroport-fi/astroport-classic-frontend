import { useMemo } from "react";
import { getTokenDenoms, isValidAmount } from "@arthuryeti/terra";

import { ESTIMATE_TOKEN } from "constants/constants";
import { calculateTokensAmounts, usePool } from "modules/pool";
import { useSimulation } from "modules/swap";
import { Pair } from "types/common";

export const useLpTokenPrice = (pair?: Pair | null, amount?: string | null) => {
  const pool = usePool(pair);

  const [token1, token2] = useMemo(() => {
    if (!pair) {
      return [null, null];
    }

    return getTokenDenoms(pair.asset_infos);
  }, [pair]);

  const tokensAmounts = useMemo(() => {
    if (!(pool && isValidAmount(amount))) {
      return null;
    }

    return calculateTokensAmounts(pool, amount);
  }, [amount, pool]);

  const { amount: totalPrice1 } = useSimulation(
    token1,
    ESTIMATE_TOKEN,
    tokensAmounts && tokensAmounts[token1]
  );

  const { amount: totalPrice2 } = useSimulation(
    token2,
    ESTIMATE_TOKEN,
    tokensAmounts && tokensAmounts[token2]
  );

  return isValidAmount(totalPrice1) && isValidAmount(totalPrice2)
    ? String(Number(totalPrice1) + Number(totalPrice2))
    : null;
};
