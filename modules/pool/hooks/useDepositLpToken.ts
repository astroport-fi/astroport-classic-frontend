import { useMemo } from "react";
import {
  useTerra,
  useAddress,
  isValidAmount,
  useTransaction,
} from "@arthuryeti/terra";

import { ONE_TOKEN } from "constants/constants";
import {
  createDepositExecuteMsg,
  createIncreaseAllowanceExecuteMsg,
} from "modules/pool/stakeLpToken";
import networks from "constants/networks";

export const useDepositLpToken = (
  amount: string | null,
  tokenAddr: string | null
) => {
  const {
    networkInfo: { name },
  } = useTerra();
  const address = useAddress();

  const executeMsgs = useMemo(() => {
    if (!(isValidAmount(amount) && address && tokenAddr)) {
      return [];
    }

    return [
      createIncreaseAllowanceExecuteMsg(
        address,
        tokenAddr,
        networks[name].gauge,
        String(Number(amount) * ONE_TOKEN)
      ),
      createDepositExecuteMsg(
        address,
        networks[name].gauge,
        tokenAddr,
        String(Number(amount) * ONE_TOKEN)
      ),
    ];
  }, [address, amount, name, tokenAddr]);

  const { fee, submit, result, error, isReady } = useTransaction({
    msgs: executeMsgs,
  });

  return {
    fee,
    result,
    error,
    isReady,
    submit,
  };
};
