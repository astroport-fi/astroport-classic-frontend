import { MsgExecuteContract } from "@terra-money/terra.js";

type Opts = {
  contract: string;
};

export const createPhase2ClaimAllMsgs = (
  options: Opts,
  sender: string
): MsgExecuteContract[] => {
  const { contract } = options;

  const msg = new MsgExecuteContract(sender, contract, {
    claim_rewards: {
      withdraw_lp_stake: false,
    },
  });

  return [msg];
};

export default createPhase2ClaimAllMsgs;
