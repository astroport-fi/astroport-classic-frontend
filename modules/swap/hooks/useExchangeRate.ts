import { num } from "@arthuryeti/terra";
import { useTokenInfo } from "modules/common";
import numeral from "numeral";
import { useMemo } from "react";

const useExchangeRate = (
  from: string,
  to: string,
  price: string | null
): string | null => {
  const { getSymbol } = useTokenInfo();

  return useMemo(() => {
    const format = (value: string) =>
      numeral(value).format("0,0.00[000]").toString();

    if (price === null) {
      return null;
    }

    if (from === "uusd" || to === "uusd") {
      if (from === "uusd") {
        return `1 ${getSymbol(to)} = ${format(price)} ${getSymbol(from)}`;
      } else {
        return `1 ${getSymbol(from)} = ${format(
          num(1).div(num(price)).toString()
        )} ${getSymbol(to)}`;
      }
    } else if (from === "uluna" || to === "uluna") {
      if (from === "uluna") {
        return `1 ${getSymbol(to)} = ${format(price)} ${getSymbol(from)}`;
      } else {
        return `1 ${getSymbol(from)} = ${format(
          num(1).div(num(price)).toString()
        )} ${getSymbol(to)}`;
      }
    } else {
      return `1 ${getSymbol(to)} = ${format(price)} ${getSymbol(from)}`;
    }
  }, [from, to, price]);
};

export default useExchangeRate;
