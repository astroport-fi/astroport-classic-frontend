import { MsgExecuteContract } from "@terra-money/terra.js";
import { ONE_TOKEN } from "constants/constants";

export const createAstroStakeMsgs = (
  sender: string,
  staking: string,
  amount: string
) => {
  const msgs = new MsgExecuteContract(sender, staking, {
    enter: {
      amount: String(+amount * ONE_TOKEN),
    },
  });

  return msgs;
};

export const createAstroUnstakeMsg = (
  sender: string,
  staking: string,
  amount: string
) => {
  const msgs = new MsgExecuteContract(sender, staking, {
    leave: {
      share: String(+amount * ONE_TOKEN),
    },
  });

  return msgs;
};
