import { toBase64 } from "@arthuryeti/terra";
import { MsgExecuteContract } from "@terra-money/terra.js";

type Opts = {
  amount: string;
  token: string;
  contract: string;
};

export const createStakeLpMsgs = (
  { contract, token, amount }: Opts,
  sender: string
): MsgExecuteContract[] => {
  const allowanceMsg = {
    increase_allowance: {
      amount,
      spender: contract,
    },
  };

  const msg1 = new MsgExecuteContract(sender, token, allowanceMsg);

  const executeMsg = {
    send: {
      contract,
      amount,
      msg: toBase64({
        deposit: {},
      }),
    },
  };

  const msg2 = new MsgExecuteContract(sender, token, executeMsg);

  return [msg1, msg2];
};

export default createStakeLpMsgs;
