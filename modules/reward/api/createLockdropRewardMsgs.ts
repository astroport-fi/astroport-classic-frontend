import { MsgExecuteContract } from "@terra-money/terra.js";

type Opts = {
  lockdrop: string;
  contract: string;
  duration: number;
};

export const createLockdropRewardMsgs = (
  options: Opts,
  sender: string
): MsgExecuteContract[] => {
  const { lockdrop, contract, duration } = options;

  if (lockdrop == null || contract == null || duration == null) {
    return null;
  }

  const msg = new MsgExecuteContract(sender, lockdrop, {
    claim_rewards_and_optionally_unlock: {
      terraswap_lp_token: contract,
      duration,
      withdraw_lp_stake: false,
    },
  });

  return [msg];
};

export default createLockdropRewardMsgs;
