import { MsgExecuteContract } from "@terra-money/terra.js";

export const createVoteMsg = (
  sender: string,
  assembly: string,
  proposal_id: number,
  vote: string
) => {
  const msg = new MsgExecuteContract(sender, assembly, {
    cast_vote: {
      proposal_id,
      vote,
    },
  });

  return msg;
};
