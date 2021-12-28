import { useMemo } from "react";

import { usePhase1Rewards, usePhase2Rewards } from "modules/reward";
import { useAirdropBalance } from "modules/airdrop";

export const useTotalRewardValue = () => {
  const phase1Rewards = usePhase1Rewards();
  const phase2Rewards = usePhase2Rewards();
  const airdropBalance = useAirdropBalance();

  return useMemo(() => {
    return airdropBalance + phase1Rewards + phase2Rewards;
  }, [airdropBalance, phase1Rewards, phase2Rewards]);
};

export default useTotalRewardValue;
