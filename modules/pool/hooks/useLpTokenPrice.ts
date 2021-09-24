import { useMemo } from "react";
import { getTokenDenoms, isValidAmount } from "@arthuryeti/terra";

import { ESTIMATE_TOKEN } from "constants/constants";
import { calculateTokensAmounts, usePool } from "modules/pool";
import { useSimulation } from "modules/swap";
import { Pair } from "types/common";

export const useLpTokenPrice = (pair: Pair, amount?: string | null) => {
  const pool = usePool({
    pairContract: pair.contract,
    lpTokenContract: pair.lpToken,
  });

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
    // @ts-expect-error
    token1,
    ESTIMATE_TOKEN,
    // @ts-expect-error
    tokensAmounts && tokensAmounts[token1]
  );

  const { amount: totalPrice2 } = useSimulation(
    // @ts-expect-error
    token2,
    ESTIMATE_TOKEN,
    // @ts-expect-error
    tokensAmounts && tokensAmounts[token2]
  );

  if (isValidAmount(totalPrice1) && isValidAmount(totalPrice2)) {
    return String(Number(totalPrice1) + Number(totalPrice2));
  }

  return "0";
};
