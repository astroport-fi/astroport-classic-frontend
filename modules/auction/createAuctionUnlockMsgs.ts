import { MsgExecuteContract } from "@terra-money/terra.js";

type CreateMsgsOptions = {
  contract: string;
  amount: string;
};

export const createAuctionUnlockMsgs = (
  options: CreateMsgsOptions,
  sender: string
): MsgExecuteContract[] => {
  const { contract, amount } = options;

  const executeMsg = new MsgExecuteContract(sender, contract, {
    claim_rewards: {
      withdraw_lp_shares: amount,
    },
  });

  return [executeMsg];
};

export default createAuctionUnlockMsgs;
