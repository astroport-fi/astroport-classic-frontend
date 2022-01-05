import { MsgExecuteContract } from "@terra-money/terra.js";

type CreateMsgsOptions = {
  token: string;
  duration: number;
  contract: string;
};

export const createUnlockMsgs = (
  options: CreateMsgsOptions,
  sender: string
): MsgExecuteContract[] => {
  const { contract, token, duration } = options;

  const executeMsg = new MsgExecuteContract(sender, contract, {
    claim_rewards_and_optionally_unlock: {
      terraswap_lp_token: token,
      duration,
      withdraw_lp_stake: true,
    },
  });

  return [executeMsg];
};

export default createUnlockMsgs;
