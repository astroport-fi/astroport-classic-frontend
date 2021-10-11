import { useMemo } from "react";
import { useAddress, useTransaction, num } from "@arthuryeti/terra";

import { ONE_TOKEN } from "constants/constants";
import {
  createDepositExecuteMsg,
  createIncreaseAllowanceExecuteMsg,
} from "modules/pool";
import { useContracts } from "modules/common";

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
}: Params) => {
  const address = useAddress();
  const { gauge } = useContracts();

  const msgs = useMemo(() => {
    if (amount == null || address == null || asset == null) {
      return [];
    }

    return [
      createIncreaseAllowanceExecuteMsg(
        address,
        asset,
        gauge,
        num(amount).times(ONE_TOKEN).toString()
      ),
      createDepositExecuteMsg(
        address,
        gauge,
        asset,
        num(amount).times(ONE_TOKEN).toString()
      ),
    ];
  }, [address, amount, gauge, asset]);

  return useTransaction({ msgs, onSuccess, onError });
};
