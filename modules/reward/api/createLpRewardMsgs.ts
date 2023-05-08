import { MsgExecuteContract } from "@terra-money/terra.js";

type Opts = {
  lp: string;
  contract: string;
};

export const createLpRewardMsgs = (
  options: Opts,
  sender: string
): MsgExecuteContract[] => {
  const { lp, contract } = options;

  if (lp == null || contract == null) {
    return [];
  }

  const msg = new MsgExecuteContract(sender, contract, {
    emergency_withdraw: {
      lp_token: lp,
    },
  });

  return [msg];
};

export default createLpRewardMsgs;
