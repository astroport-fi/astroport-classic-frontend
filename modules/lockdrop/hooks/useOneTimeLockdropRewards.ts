import { useMemo } from "react";

import { usePhase1Rewards, usePhase2Rewards } from "modules/reward";
import { useAirdropBalance } from "modules/airdrop";
import { useContracts } from "modules/common";
import { useTokenPriceInUst } from "modules/swap";
import { num } from "@arthuryeti/terra";

export const useOneTimeLockdropRewards = () => {
  const { astroToken } = useContracts();
  const phase1Rewards = usePhase1Rewards();
  const phase2Rewards = usePhase2Rewards();
  const airdropBalance = useAirdropBalance();
  const astroPrice = useTokenPriceInUst(astroToken);

  return useMemo(() => {
    return num(airdropBalance + phase1Rewards + phase2Rewards)
      .times(astroPrice)
      .toNumber();
  }, [airdropBalance, phase1Rewards, phase2Rewards]);
};

export default useOneTimeLockdropRewards;
