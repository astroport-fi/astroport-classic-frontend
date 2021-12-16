import { toTerraAmount } from "@arthuryeti/terra";
import { MsgExecuteContract } from "@terra-money/terra.js";

type CreateMsgsOptions = {
  token: {
    asset: string;
    amount: string;
  };
  duration: number;
  contract: string;
};

export const createUnlockMsgs = (
  options: CreateMsgsOptions,
  sender: string
): MsgExecuteContract[] => {
  const {
    contract,
    token: { asset, amount },
    duration,
  } = options;

  const terraAmount = toTerraAmount(amount);

  const executeMsg = new MsgExecuteContract(sender, contract, {
    withdraw_from_lockup: {
      terraswap_lp_token: asset,
      duration,
      amount: terraAmount,
    },
  });

  return [executeMsg];
};

export default createUnlockMsgs;
