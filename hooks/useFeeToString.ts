import { useMemo } from "react";
import { Fee } from "@terra-money/terra.js";
import { fromTerraAmount } from "libs/terra";

import { useAstroswap, Tokens } from "modules/common";

const coinToString = (coin: any, tokens: Tokens) => {
  const amount = fromTerraAmount(coin.amount.toString(), "0.0000");
  const symbol = tokens[coin.denom]?.symbol || "LP"; // TODO: <<= refactoring

  return `${amount} ${symbol}`;
};

const coinsToString = (coins: any, tokens: Tokens) => {
  return coins
    .toArray()
    .map((coin: any) => coinToString(coin, tokens))
    .join(" / ");
};

export const useFeeToString = (fee: Fee) => {
  const { tokens } = useAstroswap();

  return useMemo(() => {
    if (fee == null || !tokens) {
      return null;
    }

    return coinsToString(fee.amount, tokens);
  }, [fee, tokens]);
};

export default useFeeToString;
