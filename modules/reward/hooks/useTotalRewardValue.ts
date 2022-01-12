import { useMemo } from "react";

import { useOneTimeLockdropRewards } from "modules/lockdrop";
import { usePhase1Rewards, usePhase2Rewards } from "modules/reward";
import { useAirdropBalance, useAirdrop2Balance } from "modules/airdrop";

// export const useTotalRewardValue = () => {
//   const lockdropRewardsInUst = useOneTimeLockdropRewards();

//   return useMemo(() => {
//     return lockdropRewardsInUst;
//   }, [lockdropRewardsInUst]);

export const useTotalRewardValue = () => {
  const phase1Rewards = usePhase1Rewards();
  const phase2Rewards = usePhase2Rewards();
  const airdropBalance = useAirdropBalance();
  const airdrop2Balance = useAirdrop2Balance();

  return useMemo(() => {
    return airdropBalance + phase1Rewards + phase2Rewards + airdrop2Balance;
  }, [airdropBalance, phase1Rewards, phase2Rewards, airdrop2Balance]);
};

export default useTotalRewardValue;
