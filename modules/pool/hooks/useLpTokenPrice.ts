import { useMemo } from "react";

import { ESTIMATE_TOKEN } from "constants/constants";
import { calculateTokensAmounts, usePool } from "modules/pool";
import { useSwapSimulate } from "modules/swap";
import { PairResponse, getTokenDenoms } from "modules/common";
import { num } from "@arthuryeti/terra";

export const useLpTokenPrice = (pair: PairResponse, amount?: string | null) => {
  const pool = usePool({
    pairContract: pair.contract_addr,
    lpTokenContract: pair.liquidity_token,
  });

  const [token1, token2] = useMemo(() => {
    if (!pair) {
      return [null, null];
    }

    return getTokenDenoms(pair.asset_infos);
  }, [pair]);

  const tokensAmounts = useMemo(() => {
    if (pool == null || amount == null) {
      return null;
    }

    return calculateTokensAmounts(pool, amount);
  }, [amount, pool]);

  const totalPrice1 = useSwapSimulate({
    token1,
    token2: ESTIMATE_TOKEN,
    // @ts-expect-error
    amount: tokensAmounts && tokensAmounts[token1],
    reverse: false,
  });

  const totalPrice2 = useSwapSimulate({
    token1: token2,
    token2: ESTIMATE_TOKEN,
    // @ts-expect-error
    amount: tokensAmounts && tokensAmounts[token2],
    reverse: false,
  });

  return useMemo(() => {
    if (totalPrice1 == null || totalPrice2 == null) {
      return "0";
    }

    return num(totalPrice1.amount).plus(totalPrice2.amount).toString();
  }, [totalPrice1, totalPrice2]);
};
