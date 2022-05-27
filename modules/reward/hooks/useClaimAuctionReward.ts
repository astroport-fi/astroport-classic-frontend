import { useMemo } from "react";
import useAddress from "hooks/useAddress";

import { useContracts } from "modules/common";
import { createAuctionRewardMsgs } from "modules/reward";

type Params = {
  amount: string;
};

export const useClaimAuctionReward = ({ amount }: Params) => {
  const { auction } = useContracts();
  const address = useAddress();

  const msgs = useMemo(() => {
    if (amount == null) {
      return null;
    }

    const msgs = createAuctionRewardMsgs(
      {
        contract: auction,
        amount,
      },
      address || ""
    );

    return msgs;
  }, [address, auction, amount]);

  return { msgs };
};

export default useClaimAuctionReward;
