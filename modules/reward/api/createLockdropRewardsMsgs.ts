import { MsgExecuteContract } from "@terra-money/terra.js";

type Item = {
  duration: number;
  lp: string;
};

type Opts = {
  contract: string;
  items: Item[];
};

export const createLockdropRewardsMsgs = (
  options: Opts,
  sender: string
): MsgExecuteContract[] => {
  const { contract, items } = options;
  let msgs = [];

  if (items.length == 0) {
    return msgs;
  }

  items.forEach((item) => {
    msgs.push(
      new MsgExecuteContract(sender, contract, {
        claim_rewards_and_optionally_unlock: {
          terraswap_lp_token: item.lp,
          duration: item.duration,
          withdraw_lp_stake: false,
        },
      })
    );
  });

  return msgs;
};

export default createLockdropRewardsMsgs;
