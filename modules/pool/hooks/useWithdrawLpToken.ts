import {
  isValidAmount,
  useAddress,
  useTerra,
  useTransaction,
} from "@arthuryeti/terra";

import { ONE_TOKEN } from "constants/constants";
import networks from "constants/networks";
import { createEmergencyWithdrawExecuteMsg } from "modules/pool/stakeLpToken";
import { useMemo } from "react";

export const useWithdrawLpToken = (
  amount: string | null,
  tokenAddr: string | null
) => {
  const {
    networkInfo: { name },
  } = useTerra();
  const gauge = networks[name].gauge;
  const address = useAddress();

  const executeMsgs = useMemo(() => {
    if (!(isValidAmount(amount) && address && tokenAddr)) {
      return [];
    }

    return [
      // TODO: change emergency withdraw to withdraw
      createEmergencyWithdrawExecuteMsg(
        address,
        gauge,
        tokenAddr,
        String(Number(amount) * ONE_TOKEN)
      ),
    ];
  }, [address, amount, gauge, tokenAddr]);

  const { fee, submit, result, error, isReady } = useTransaction({
    msgs: executeMsgs,
  });

  return {
    fee,
    submit,
    result,
    error,
    isReady,
  };
};
