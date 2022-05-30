import { useMemo } from "react";
import { useWallet } from "@terra-money/wallet-provider";

export const useClassicNetwork = () => {
  const wallet = useWallet();

  return useMemo(() => {
    return wallet.network.name === "classic";
  }, [wallet]);
};
