import { MsgExecuteContract } from "@terra-money/terra.js";

type Item = {
  contract?: string;
  duration: number;
};

type Opts = {
  contract: string;
  items: Item[];
};

export const createPhase1ClaimAllMsgs = (
  options: Opts,
  sender: string
): MsgExecuteContract[] => {
  const { contract, items } = options;
  let msgs: any[] = [];

  if (items.length == 0) {
    return msgs;
  }

  msgs.push(
    new MsgExecuteContract(sender, contract, {
      claim_rewards_and_optionally_unlock: {
        terraswap_lp_token: items[0]?.contract,
        duration: items[0]?.duration,
        withdraw_lp_stake: false,
      },
    })
  );

  return msgs;
};

export default createPhase1ClaimAllMsgs;
