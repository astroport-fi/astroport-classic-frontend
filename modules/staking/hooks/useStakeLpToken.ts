import { useMemo } from "react";
import { TxInfo } from "@terra-money/terra.js";
import {
  useAddress,
  useTransaction,
  TxStep,
  toTerraAmount,
  num,
} from "@arthuryeti/terra";

import { createStakeLpMsgs } from "modules/staking";
import { useContracts } from "modules/common";

export type StakeLpTokenState = {
  error: any;
  fee: any;
  txHash?: string;
  txStep: TxStep;
  reset: () => void;
  submit: () => void;
};

type Params = {
  amount: string | null;
  token: string | null;
  onBroadcasting?: (txHash: string) => void;
  onSuccess?: (txHash: string, txInfo?: TxInfo) => void;
  onError?: (txHash?: string, txInfo?: TxInfo) => void;
};

export const useStakeLpToken = ({
  amount,
  token,
  onBroadcasting,
  onSuccess,
  onError,
}: Params): StakeLpTokenState => {
  const address = useAddress();
  const { generator } = useContracts();

  const msgs = useMemo(() => {
    if (amount == "" || num(amount).eq(0) || address == null || token == null) {
      return null;
    }

    return createStakeLpMsgs(
      { amount: toTerraAmount(amount), token, contract: generator },
      address
    );
  }, [address, amount, generator, token]);

  return useTransaction({ msgs, onBroadcasting, onSuccess, onError });
};
