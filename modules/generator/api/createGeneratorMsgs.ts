import { toBase64 } from "libs/terra";
import { MsgExecuteContract } from "@terra-money/terra.js";

type StakeOpts = {
  amount: string;
  token: string;
  contract: string;
};

export const createStakeLpMsgs = (
  { contract, token, amount }: StakeOpts,
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

type UnstakeOpts = {
  amount: string;
  token: string;
  contract: string;
};

export const createUnstakeLpMsgs = (
  { contract, token, amount }: UnstakeOpts,
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
