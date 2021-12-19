import { MsgExecuteContract } from "@terra-money/terra.js";

type Opts = {
  amount: string;
  token: string;
  contract: string;
};

export const createUnstakeLpMsgs = (
  { contract, token, amount }: Opts,
  sender: string
): MsgExecuteContract[] => {
  const executeMsg = {
    withdraw: {
      lp_token: token,
      amount,
    },
  };

  const msg = new MsgExecuteContract(sender, contract, executeMsg);

  return [msg];
};

export default createUnstakeLpMsgs;
