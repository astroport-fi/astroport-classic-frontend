import { toBase64 } from "@arthuryeti/terra";
import { MsgExecuteContract } from "@terra-money/terra.js";
import { validateJsonInput } from "modules/common";
import { GovernanceProposal } from "types/common";

export const createProposalMsg = (
  sender: string,
  assembly: string,
  xAstroToken: string,
  amount: string,
  proposal: GovernanceProposal
) => {
  const executeMsg = {
    send: {
      contract: assembly,
      amount,
      msg: toBase64({
        submit_proposal: {
          title: proposal?.title,
          description: proposal?.description,
          link: proposal?.link?.length > 0 ? proposal.link : null,
          messages:
            proposal?.msg?.length > 0 && validateJsonInput(proposal.msg)
              ? JSON.parse(proposal.msg)
              : null,
        },
      }),
    },
  };

  const msgs = new MsgExecuteContract(sender, xAstroToken, executeMsg);

  return msgs;
};
