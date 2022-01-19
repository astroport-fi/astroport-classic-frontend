import { useMemo } from "react";
import { useAddress, useTransaction } from "@arthuryeti/terra";
import { TxInfo } from "@terra-money/terra.js";

import { useContracts } from "modules/common";
import { createLockdropRewardMsgs } from "modules/reward";

type Params = {
  contract: string;
  duration: number;
  onBroadcasting?: (txHash: string) => void;
  onSuccess?: (txHash: string, txInfo?: TxInfo) => void;
  onError?: (txHash?: string, txInfo?: TxInfo) => void;
};

export const useClaimLockdropReward = ({
  contract,
  duration,
  onBroadcasting,
  onSuccess,
  onError,
}: Params) => {
  const { lockdrop } = useContracts();
  const address = useAddress();

  const msgs = useMemo(() => {
    if (contract == null || duration == null) {
      return null;
    }

    const msgs = createLockdropRewardMsgs(
      {
        lockdrop,
        contract,
        duration,
      },
      address
    );

    return msgs;
  }, [address, lockdrop, contract, duration]);

  return useTransaction({
    msgs,
    onBroadcasting,
    onSuccess,
    onError,
  });
};

export default useClaimLockdropReward;
