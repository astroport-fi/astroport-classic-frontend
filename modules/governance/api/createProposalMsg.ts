import { toBase64 } from "@arthuryeti/terra";
import { MsgExecuteContract } from "@terra-money/terra.js";
import { validateJsonInput } from "modules/common";
import { Proposal } from "types/common";

export const createProposalMsg = (
  sender: string,
  assembly: string,
  xAstroToken: string,
  amount: string,
  proposal: Proposal
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
            proposal?.messages?.length > 0 &&
            validateJsonInput(proposal.messages)
              ? JSON.parse(proposal.messages)
              : null,
        },
      }),
    },
  };

  const msgs = new MsgExecuteContract(sender, xAstroToken, executeMsg);

  return msgs;
};
