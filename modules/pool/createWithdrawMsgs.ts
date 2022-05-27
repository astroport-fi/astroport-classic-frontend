import { toBase64 } from "libs/terra";
import { MsgExecuteContract } from "@terra-money/terra.js";

type CreateWithdrawMsgsOptions = {
  contract: string;
  lpToken: string;
  amount: string;
};

export const createWithdrawMsgs = (
  options: CreateWithdrawMsgsOptions,
  sender: string
) => {
  const { contract, lpToken, amount } = options;

  const executeMsg = {
    send: {
      contract,
      amount,
      msg: toBase64({
        withdraw_liquidity: {},
      }),
    },
  };

  const msg = new MsgExecuteContract(sender, lpToken, executeMsg);

  return [msg];
};
