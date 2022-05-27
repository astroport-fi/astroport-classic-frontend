import { useMemo } from "react";
import useAddress from "hooks/useAddress";

import { useContracts } from "modules/common";
import { createProposalMsg } from "modules/governance";
import { Proposal } from "types/common";

type Params = {
  amount: string;
  proposal: Proposal;
};

export const useCreateProposal = ({ amount, proposal }: Params): any => {
  const { assembly, xAstroToken } = useContracts();
  const address = useAddress() || "";

  const msgs = useMemo(() => {
    if (!amount) {
      return null;
    }

    const msg = createProposalMsg(
      address,
      assembly,
      xAstroToken,
      amount,
      proposal
    );
    return [msg];
  }, [
    address,
    assembly,
    amount,
    proposal.title,
    proposal.description,
    proposal.messages,
    proposal.link,
  ]);

  return { msgs };
};

export default useCreateProposal;
