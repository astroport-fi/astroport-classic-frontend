import { useMemo } from "react";
import { useAddress, num, useTransaction, TxStep } from "@arthuryeti/terra";

import { ONE_TOKEN } from "constants/constants";
import { useContracts } from "modules/common";
import { createEmergencyWithdrawExecuteMsg } from "modules/pool";

export type UnstakeLpTokenState = {
  error: any;
  fee: any;
  txHash?: string;
  txStep: TxStep;
  reset: () => void;
  submit: () => void;
};

type Params = {
  amount: string | null;
  asset: string | null;
  onSuccess?: (txHash: string) => void;
  onError?: (txHash?: string) => void;
};

export const useUnstakeLpToken = ({
  amount,
  asset,
  onSuccess,
  onError,
}: Params): UnstakeLpTokenState => {
  const { generator } = useContracts();
  const address = useAddress();

  const msgs = useMemo(() => {
    if (amount == null || address == null || asset == null) {
      return null;
    }

    return [
      // TODO: change emergency withdraw to withdraw
      createEmergencyWithdrawExecuteMsg(
        address,
        generator,
        asset,
        num(amount).times(ONE_TOKEN).toString()
      ),
    ];
  }, [address, amount, generator, asset]);

  return useTransaction({
    msgs,
    onSuccess,
    onError,
  });
};
