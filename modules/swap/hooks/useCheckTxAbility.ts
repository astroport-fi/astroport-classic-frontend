import { useMemo } from "react";
import { Coins } from "@terra-money/terra.js";
import { useTerraController } from "components/TerraController/TerraController";
import { checkBalance } from "helpers";

export const useCheckTxAbility = (
  offerAssets: Coins | null,
  fee: Coins | null,
  lpTokensBalance?: Coins | null
) => {
  const { balance } = useTerraController();

  const [isEnoughBalance, txCost] = useMemo(() => {
    if (!(offerAssets && balance)) {
      return [true, null];
    }

    const combinedBalance = lpTokensBalance
      ? balance.toDecCoins().add(lpTokensBalance)
      : balance;

    const { isEnough, txCost: cost } = checkBalance(
      combinedBalance,
      offerAssets,
      fee
    );

    return [isEnough, cost];
  }, [balance, fee, lpTokensBalance, offerAssets]);

  const isTxAvailable = fee && isEnoughBalance;

  return {
    txCost,
    isEnoughBalance,
    isTxAvailable,
  };
};
