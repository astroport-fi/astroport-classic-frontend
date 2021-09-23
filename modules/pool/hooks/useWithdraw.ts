import { useMemo } from "react";
import { StdFee } from "@terra-money/terra.js";
import { TxResult } from "@terra-dev/wallet-types";
import {
  getTokenDenom,
  isValidAmount,
  useAddress,
  useTransaction,
} from "@arthuryeti/terra";

import { createWithdrawMsgs, useGetPool } from "modules/pool";
import { useTokenPrice } from "modules/swap";
import { ONE_TOKEN } from "constants/constants";

export type WithdrawState = {
  token1?: string;
  token1Amount?: string;
  token1Price: string;
  token2?: string;
  token2Amount?: string;
  token2Price: string;
  isReady: boolean;
  result: TxResult;
  error: string | null;
  fee: StdFee | null;
  withdrawLiquidity: () => void;
};

type Params = {
  contract: string;
  amount: string;
  lpToken: string;
};

export const useWithdraw = ({
  contract,
  lpToken,
  amount,
}: Params): WithdrawState => {
  const address = useAddress();
  const { data: pool } = useGetPool(contract);

  const ratio: any = useMemo(() => {
    if (pool == null) {
      return {};
    }

    return pool.assets.reduce((prev, a) => {
      return {
        ...prev,
        [getTokenDenom(a.info)]: Number(a.amount) / Number(pool.total_share),
      };
    }, {});
  }, [pool]);

  const tokens = useMemo(() => {
    if (pool == null || ratio == null) {
      return {};
    }

    const token1 = getTokenDenom(pool.assets[0].info);
    const token2 = getTokenDenom(pool.assets[1].info);

    return {
      token1,
      token2,
      token1Amount: String((Number(amount) * ratio[token1]) / ONE_TOKEN),
      token2Amount: String((Number(amount) * ratio[token2]) / ONE_TOKEN),
    };
  }, [pool, ratio, amount]);

  // @ts-expect-error
  const token1Price = useTokenPrice(tokens.token1);
  // @ts-expect-error
  const token2Price = useTokenPrice(tokens.token2);

  const msgs = useMemo(() => {
    if (!isValidAmount(amount)) {
      return [];
    }

    return createWithdrawMsgs(
      {
        contract,
        lpToken,
        amount,
      },
      address
    );
  }, [address, contract, lpToken, amount]);

  const { fee, submit, result, error, isReady } = useTransaction({ msgs });

  return {
    ...tokens,
    token1Price,
    token2Price,
    fee,
    result,
    error,
    isReady,
    withdrawLiquidity: submit,
  };
};

export default useWithdraw;
