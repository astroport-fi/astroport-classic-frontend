import { useMemo } from "react";
import useAddress from "hooks/useAddress";
import {
  getTokenDenom,
  useTokenInfo,
  useTransaction,
  TxStep,
  TxErrorHandler,
} from "modules/common";
import {
  createWithdrawMsgs,
  useGetPool,
  shouldReverseTokenOrder,
} from "modules/pool";
import num from "libs/num";

export type WithdrawState = {
  token1?: string;
  token1Amount?: string;
  token2?: string;
  token2Amount?: string;
  error: any;
  fee: any;
  txHash?: string;
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
  onBroadcasting,
  onError,
}: Params): WithdrawState => {
  const { data: pool } = useGetPool(contract);
  const { getDecimals, getSymbol } = useTokenInfo();
  const address = useAddress();

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

  const tokens = useMemo<Tokens>(() => {
    if (pool == null || ratio == null || amount == null) {
      return {};
    }

    const token1 = getTokenDenom(pool.assets[0].info);
    const token2 = getTokenDenom(pool.assets[1].info);

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
        token1: tokens.token1,
        token2: tokens.token2,
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
