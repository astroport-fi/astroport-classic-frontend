import { useMemo } from "react";
import useAddress from "hooks/useAddress";
import {
  getTokenDenom,
  useTokenInfo,
  useTransaction,
  TxStep,
  TxErrorHandler,
} from "modules/common";
import { createWithdrawMsgs, useGetPool } from "modules/pool";

export type WithdrawState = {
  token1?: string;
  token1Amount?: string;
  token2?: string;
  token2Amount?: string;
  error: any;
  fee: any;
  txHash?: string | undefined;
  txStep: TxStep;
  reset: () => void;
  withdraw: () => void;
};

type Params = {
  contract: string;
  lpToken: string;
  amount: string | null;
  onBroadcasting?: (txHash: string) => void;
  onError?: TxErrorHandler;
};

type Tokens = {
  token1?: string;
  token2?: string;
  token1Amount?: string;
  token2Amount?: string;
};

export const useWithdraw = ({
  contract,
  lpToken,
  amount,
  onBroadcasting = () => null,
  onError = () => null,
}: Params): WithdrawState => {
  const { data: pool } = useGetPool(contract);
  const { getDecimals } = useTokenInfo();
  const address = useAddress();

  const ratio: any = useMemo(() => {
    if (pool == null) {
      return {};
    }

    // @ts-expect-error
    return (pool?.assets || []).reduce((prev, a) => {
      return {
        ...prev,
        [getTokenDenom(a.info)]: Number(a.amount) / Number(pool.total_share),
      };
    }, {});
  }, [pool]);

  const tokens = useMemo<Tokens>(() => {
    if (pool == null || ratio == null || amount == null) {
      return {};
    }

    const firstToken = pool.assets ? pool.assets[0].info : undefined;
    const secondToken = pool.assets ? pool.assets[1].info : undefined;
    const token1 = getTokenDenom(firstToken);
    const token2 = getTokenDenom(secondToken);

    const data = {
      token1,
      token2,
      token1Amount: num(amount)
        .times(ratio[token1])
        .div(10 ** getDecimals(token1))
        .toFixed(6),
      token2Amount: num(amount)
        .times(ratio[token2])
        .div(10 ** getDecimals(token2))
        .toFixed(6),
    };

    return data;
  }, [pool, ratio, amount]);

  const msgs = useMemo(() => {
    if (amount == null) {
      return [];
    }

    return createWithdrawMsgs(
      {
        contract,
        lpToken,
        amount,
      },
      address || ""
    );
  }, [address, contract, lpToken, amount]);

  const { submit, ...rest } = useTransaction({
    notification: {
      type: "withdraw",
      data: {
        token1: tokens.token1 || null,
        token2: tokens.token2 || null,
      },
    },
    msgs,
    onBroadcasting,
    onError,
  });

  return useMemo(() => {
    return {
      ...tokens,
      ...rest,
      withdraw: submit,
    };
  }, [rest, tokens]);
};

export default useWithdraw;
