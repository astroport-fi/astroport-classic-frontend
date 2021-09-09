import { toBase64 } from "@arthuryeti/terra";
import { MsgExecuteContract } from "@terra-money/terra.js";

import { Pair } from "types/common";

type CreateWithdrawalMsgsOptions = {
  pair: Pair;
  amount: string;
};

export const createWithdrawalMsgs = async (
  options: CreateWithdrawalMsgsOptions,
  sender: string
) => {
  const { pair, amount } = options;

  const executeMsg = {
    send: {
      contract: pair.contract,
      amount,
      msg: toBase64({
        withdraw_liquidity: {},
      }),
    },
  };

  const msg = new MsgExecuteContract(sender, pair.lpToken, executeMsg);

  return [msg];
};
