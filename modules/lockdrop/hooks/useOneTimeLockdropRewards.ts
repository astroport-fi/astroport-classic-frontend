import { useMemo } from "react";
import { num } from "@arthuryeti/terra";

import { usePhase1Rewards, usePhase2Rewards } from "modules/reward";
import { useAirdropBalance, useAirdrop2Balance } from "modules/airdrop";
import { useContracts } from "modules/common";
import { useTokenPriceInUstWithSimulate } from "modules/swap";

export const useOneTimeLockdropRewards = () => {
  const { astroToken } = useContracts();
  const phase1Rewards = usePhase1Rewards();
  const phase2Rewards = usePhase2Rewards();
  const airdropBalance = useAirdropBalance();
  const airdrop2Balance = useAirdrop2Balance();
  const astroPrice = useTokenPriceInUstWithSimulate(astroToken);

  return useMemo(() => {
    return num(airdropBalance + phase1Rewards + phase2Rewards + airdrop2Balance)
      .times(astroPrice)
      .toNumber();
  }, [airdropBalance, phase1Rewards, phase2Rewards]);
};

export default useOneTimeLockdropRewards;
