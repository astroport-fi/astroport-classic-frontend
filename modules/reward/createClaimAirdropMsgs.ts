import { MsgExecuteContract } from "@terra-money/terra.js";

type Opts = {
  contract: string;
  isClaimed: boolean;
  claimAmount?: string;
  merkleProof?: string[];
  rootIndex?: number;
};

export const createClaimAirdropMsgs = (
  options: Opts,
  sender: string
): MsgExecuteContract[] => {
  const { contract, claimAmount, merkleProof, rootIndex, isClaimed } = options;
  let msg;

  if (!isClaimed) {
    msg = new MsgExecuteContract(sender, contract, {
      claim: {
        claim_amount: claimAmount,
        merkle_proof: merkleProof,
        root_index: rootIndex,
      },
    });
  } else {
    msg = new MsgExecuteContract(sender, contract, {
      withdraw_airdrop_reward: {},
    });
  }

  return [msg];
};

export default createClaimAirdropMsgs;
