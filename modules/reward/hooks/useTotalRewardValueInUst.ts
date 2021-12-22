import { useMemo } from "react";

import { useContracts } from "modules/common";
import { usePhase1Rewards, usePhase2Rewards } from "modules/reward";
import { useAirdropBalance } from "modules/airdrop";
import { useTokenPriceInUst } from "modules/swap";

export const useTotalRewardValueInUst = () => {
  const { astroToken } = useContracts();
  const price = useTokenPriceInUst(astroToken);
  const phase1Rewards = usePhase1Rewards();
  const phase2Rewards = usePhase2Rewards();
  const airdropBalance = useAirdropBalance();

  return useMemo(() => {
    return (airdropBalance + phase1Rewards + phase2Rewards) * price;
  }, [airdropBalance, phase1Rewards, phase2Rewards, price]);
};

export default useTotalRewardValueInUst;
