import { useTokenInfo } from "modules/common";
import numeral from "numeral";
import { useMemo } from "react";

const useExchangeRate = (
  token1: string,
  token2: string,
  price: string | null
): string | null => {
  const { getSymbol } = useTokenInfo();

  return useMemo(() => {
    const format = (value: string) =>
      numeral(value).format("0,0.00[000]").toString();

    if (price === null) {
      return null;
    }

    const token2Rate = `1 ${getSymbol(token2)} = ${format(price)} ${getSymbol(
      token1
    )}`;
    const token1Rate = `1 ${getSymbol(token1)} = ${format(
      String(1 / Number(price))
    )} ${getSymbol(token2)}`;

    // UST Pair
    if (token1 === "uusd" || token2 === "uusd") {
      return token1 === "uusd" ? token2Rate : token1Rate;
    }

    // LUNA Pair
    if (token1 === "uluna" || token2 === "uluna") {
      return token1 === "uluna" ? token2Rate : token1Rate;
    }

    return token2Rate;
  }, [price]);
};

export default useExchangeRate;
