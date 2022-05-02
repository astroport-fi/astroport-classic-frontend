import { MsgExecuteContract } from "@terra-money/terra.js";

type Opts = {
  contract: string;
  amount: string;
};

export const createAuctionRewardMsgs = (
  options: Opts,
  sender: string
): MsgExecuteContract[] => {
  const { contract, amount } = options;

  if (contract == null || amount == null) {
    return [];
  }

  const msg = new MsgExecuteContract(sender, contract, {
    claim_rewards: {
      withdraw_lp_shares: amount,
    },
  });

  return [msg];
};

export default createAuctionRewardMsgs;
