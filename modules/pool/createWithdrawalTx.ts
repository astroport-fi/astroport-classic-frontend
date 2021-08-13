import { toBase64 } from "modules/terra";
import { MsgExecuteContract } from "@terra-money/terra.js";

export const createWithdrawalTx = async (
  client,
  pair: any,
  amount: string,
  sender: string
) => {
  const executeMsg = {
    send: {
      contract: pair.contract_addr,
      amount,
      msg: toBase64({
        withdraw_liquidity: {},
      }),
    },
  };

  const msg = new MsgExecuteContract(sender, pair.liquidity_token, executeMsg);

  const tx = await client.tx.create(sender, { msgs: [msg] });

  const data = { tx };

  return {
    error: false,
    message: null,
    data,
  };
};
