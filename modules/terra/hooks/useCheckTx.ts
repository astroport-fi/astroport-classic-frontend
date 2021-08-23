import { useMemo } from "react";
import { Coins } from "@terra-money/terra.js";
import { useTerra } from "contexts/TerraContext";
import { checkBalance } from "modules/terra";

export const useCheckTx = (
  offerAssets: Coins | null,
  fee: Coins | null,
  lpBalance?: Coins | null
) => {
  const { balances } = useTerra();

  const [isEnoughBalance, txCost] = useMemo(() => {
    if (!(offerAssets && balances)) {
      return [true, null];
    }

    const combinedBalance = lpBalance
      ? balances.toDecCoins().add(lpBalance)
      : balances;

    const { isEnough, txCost: cost } = checkBalance(
      combinedBalance,
      offerAssets,
      fee
    );

    return [isEnough, cost];
  }, [balances, fee, lpBalance, offerAssets]);

  const isTxAvailable = fee && isEnoughBalance;

  return {
    txCost,
    isEnoughBalance,
    isTxAvailable,
  };
};
