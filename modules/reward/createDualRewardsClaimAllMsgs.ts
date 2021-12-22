import { num, toBase64, toTerraAmount } from "@arthuryeti/terra";
import { MsgExecuteContract } from "@terra-money/terra.js";

type Item = {
  contract: string;
  duration: number;
  astroDebt: string;
};

type Opts = {
  contract: string;
  items: Item[];
};

export const createDualRewardsClaimAllMsgs = (
  options: Opts,
  sender: string
): MsgExecuteContract[] => {
  const { contract, items } = options;
  let msgs = [];

  if (items.length == 0) {
    return msgs;
  }

  items.forEach((item) => {
    if (num(item.astroDebt).eq(0)) {
      return;
    }

    msgs.push(
      new MsgExecuteContract(sender, contract, {
        claim_rewards_and_optionally_unlock: {
          terraswap_lp_token: item.contract,
          duration: item.duration,
          withdraw_lp_stake: false,
        },
      })
    );
  });

  return msgs;
};

export default createDualRewardsClaimAllMsgs;
