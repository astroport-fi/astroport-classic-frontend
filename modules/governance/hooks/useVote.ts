import { useMemo } from "react";
import useAddress from "hooks/useAddress";

import { useContracts } from "modules/common";
import { createVoteMsg } from "modules/governance";

type Params = {
  proposal_id: number;
  vote: string;
};

export const useVote = ({ proposal_id, vote }: Params): any => {
  const { assembly } = useContracts();
  const address = useAddress() || "";

  const msgs = useMemo(() => {
    if (!proposal_id || !vote) {
      return null;
    }

    const msg = createVoteMsg(address, assembly, proposal_id, vote);

    return [msg];
  }, [address, assembly, proposal_id, vote]);

  return { msgs };
};

export default useVote;
