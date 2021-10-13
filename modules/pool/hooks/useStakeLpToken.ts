import { useMemo } from "react";
import { useAddress, useTransaction, num, TxStep } from "@arthuryeti/terra";

import { ONE_TOKEN } from "constants/constants";
import {
  createDepositExecuteMsg,
  createIncreaseAllowanceExecuteMsg,
} from "modules/pool";
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
  asset: string | null;
  onSuccess?: (txHash: string) => void;
  onError?: (txHash?: string) => void;
};

export const useStakeLpToken = ({
  amount,
  asset,
  onSuccess,
  onError,
}: Params): StakeLpTokenState => {
  const address = useAddress();
  const { generator } = useContracts();

  const msgs = useMemo(() => {
    if (amount == null || address == null || asset == null) {
      return null;
    }

    return [
      createIncreaseAllowanceExecuteMsg(
        address,
        asset,
        generator,
        num(amount).times(ONE_TOKEN).toString()
      ),
      createDepositExecuteMsg(
        address,
        generator,
        asset,
        num(amount).times(ONE_TOKEN).toString()
      ),
    ];
  }, [address, amount, generator, asset]);

  return useTransaction({ msgs, onSuccess, onError });
};
