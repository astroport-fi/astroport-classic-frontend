import { toBase64 } from "@arthuryeti/terra";
import { MsgExecuteContract } from "@terra-money/terra.js";

import { ONE_TOKEN } from "constants/constants";

export const createAstroStakeMsgs = (
  sender: string,
  staking: string,
  amount: string,
  token: string
) => {
  const msgs = new MsgExecuteContract(sender, token, {
    send: {
      contract: staking,
      amount: String(+amount * ONE_TOKEN),
      msg: toBase64({
        enter: {},
      }),
    },
  });

  return msgs;
};

export const createAstroUnstakeMsg = (
  sender: string,
  staking: string,
  amount: string,
  token: string
) => {
  const msgs = new MsgExecuteContract(sender, token, {
    send: {
      contract: staking,
      amount: String(+amount * ONE_TOKEN),
      msg: toBase64({
        leave: {},
      }),
    },
  });

  return msgs;
};
