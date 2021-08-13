import { ONE_TOKEN, ESTIMATE_TOKEN } from "constants/constants";
import { useSimulation } from "modules/swap";

export const useTokenPrice = (token1: string) => {
  const simulation = useSimulation(token1, ESTIMATE_TOKEN, String(ONE_TOKEN));

  return simulation.amount;
};

export default useSimulation;
