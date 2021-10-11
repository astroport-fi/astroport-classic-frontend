import { useMemo } from "react";
import { useAddress, num, useTransaction } from "@arthuryeti/terra";

import { ONE_TOKEN } from "constants/constants";
import { useContracts } from "modules/common";
import { createEmergencyWithdrawExecuteMsg } from "modules/pool";

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
}: Params) => {
  const { gauge } = useContracts();
  const address = useAddress();

  const msgs = useMemo(() => {
    if (amount == null || address == null || asset == null) {
      return [];
    }

    return [
      // TODO: change emergency withdraw to withdraw
      createEmergencyWithdrawExecuteMsg(
        address,
        gauge,
        asset,
        num(amount).times(ONE_TOKEN).toString()
      ),
    ];
  }, [address, amount, gauge, asset]);

  return useTransaction({
    msgs,
    onSuccess,
    onError,
  });
};
