import { useMemo } from "react";
import { Coin } from "@terra-money/terra.js";
import useAddress from "hooks/useAddress";
import num from "libs/num";
import {
  useTokenInfo,
  useTransaction,
  TxStep,
  TxErrorHandler,
} from "modules/common";
import { createProvideMsgs, Pool } from "modules/pool";

export type ProvideState = {
  error: any;
  fee: any;
  txHash?: string | undefined;
  txStep: TxStep;
  reset: () => void;
  submit: () => void;
};

type Params = {
  pool: Pool;
  contract: string;
  token1: string;
  amount1?: string;
  token2: string;
  amount2?: string;
  autoStake: boolean;
  onBroadcasting?: (txHash: string) => void;
  onError?: TxErrorHandler;
};

export const useProvide = ({
  contract,
  pool,
  token1,
  token2,
  amount1,
  amount2,
  autoStake,
  onBroadcasting = () => null,
  onError = () => null,
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
      return [];
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
      address || ""
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
    notification: {
      type: "provide",
      data: {
        token1,
        token2,
      },
    },
    msgs,
    onBroadcasting,
    onError,
  });
};

export default useProvide;
