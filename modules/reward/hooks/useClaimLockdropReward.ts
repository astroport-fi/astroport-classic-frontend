import { useMemo } from "react";
import { useAddress } from "@arthuryeti/terra";

import { useContracts } from "modules/common";
import { createLockdropRewardMsgs } from "modules/reward";

type Params = {
  contract: string;
  duration: number;
};

export const useClaimLockdropReward = ({ contract, duration }: Params) => {
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

  return { msgs };
};

export default useClaimLockdropReward;
