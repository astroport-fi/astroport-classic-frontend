import { useMemo } from "react";
import { Coin } from "@terra-money/terra.js";
import { isValidAmount, useAddress, useTransaction } from "@arthuryeti/terra";

import { createProvideMsgs } from "modules/pool";
import { Pool } from "types/common";

type Params = {
  pool: Pool;
  contract: string;
  token1: string;
  amount1: string;
  token2: string;
  amount2: string;
};

export const useProvide = ({
  contract,
  pool,
  token1,
  token2,
  amount1,
  amount2,
}: Params) => {
  const address = useAddress();

  const msgs = useMemo(() => {
    if (!isValidAmount(amount1) || !isValidAmount(amount2) || pool == null) {
      return;
    }

    return createProvideMsgs(
      {
        contract,
        pool,
        coin1: new Coin(token1, amount1),
        coin2: new Coin(token2, amount2),
      },
      address
    );
  }, [address, contract, pool, token1, token2, amount1, amount2]);

  const { fee, submit, result, error, isReady } = useTransaction({ msgs });

  return {
    fee,
    result,
    error,
    isReady,
    provideLiquidity: submit,
  };
};

export default useProvide;
