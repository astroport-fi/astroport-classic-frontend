import { useMemo } from "react";
import { Coin, TxInfo } from "@terra-money/terra.js";
import { useAddress, useTransaction, TxStep, num } from "@arthuryeti/terra";

import { useTokenInfo } from "modules/common";
import { createProvideMsgs, Pool } from "modules/pool";

export type ProvideState = {
  error: any;
  fee: any;
  txHash?: string;
  txStep: TxStep;
  reset: () => void;
  submit: () => void;
};

type Params = {
  pool: Pool;
  contract: string;
  token1: string;
  amount1: string | null;
  token2: string;
  amount2: string | null;
  autoStake: boolean;
  onBroadcasting?: (txHash: string) => void;
  onSuccess?: (txHash: string, txInfo?: TxInfo) => void;
  onError?: (txHash?: string, txInfo?: TxInfo) => void;
};

export const useProvide = ({
  contract,
  pool,
  token1,
  token2,
  amount1,
  amount2,
  autoStake,
  onBroadcasting,
  onSuccess,
  onError,
}: Params): ProvideState => {
  const address = useAddress();
  const { getDecimals } = useTokenInfo();

  const terraAmount1 = num(amount1)
    .times(10 ** getDecimals(token1))
    .toFixed(0);
  const terraAmount2 = num(amount2)
    .times(num(10).pow(getDecimals(token2)))
    .toFixed(0);

  const msgs = useMemo(() => {
    if (
      terraAmount1 == "" ||
      terraAmount2 == "" ||
      contract == null ||
      pool == null ||
      num(terraAmount1).eq(0) ||
      num(terraAmount2).eq(0)
    ) {
      return null;
    }

    return createProvideMsgs(
      {
        contract,
        pool,
        coin1: new Coin(token1, terraAmount1),
        coin2: new Coin(token2, terraAmount2),
        autoStake,
        slippage: "0.02",
      },
      address
    );
  }, [
    address,
    contract,
    pool,
    token1,
    token2,
    autoStake,
    terraAmount1,
    terraAmount2,
  ]);

  return useTransaction({
    msgs,
    onBroadcasting,
    onSuccess,
    onError,
  });
};

export default useProvide;
