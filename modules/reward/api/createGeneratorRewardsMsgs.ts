import { num, toBase64, toTerraAmount } from "@arthuryeti/terra";
import { MsgExecuteContract } from "@terra-money/terra.js";
import { uniqBy } from "lodash";

type Item = {
  lp: string;
};

type Opts = {
  contract: string;
  items: Item[];
};

export const createGeneratorRewardsMsgs = (
  options: Opts,
  sender: string
): MsgExecuteContract[] => {
  const { contract, items } = options;
  let msgs = [];

  if (items.length == 0) {
    return msgs;
  }

  const itemsUniq = uniqBy(items, "lp");

  itemsUniq.forEach((item) => {
    msgs.push(
      new MsgExecuteContract(sender, contract, {
        withdraw: {
          lp_token: item.lp,
          amount: "0",
        },
      })
    );
  });

  return msgs;
};

export default createGeneratorRewardsMsgs;
