import { useMemo } from "react";
import { num } from "@arthuryeti/terra";
import { getPoolTokenDenoms, useTokenInfo, Asset } from "modules/common";
import { ONE_TOKEN } from "constants/constants";

type Response = { label: string; value: number }[] | null;

export const useTokenTooltip = (
  type: any,
  assets?: [Asset, Asset],
  myLiqudity?: number,
  totalLiquidity?: number
): Response => {
  const { getSymbol, getDecimals } = useTokenInfo();

  return useMemo(() => {
    if (
      type == null ||
      assets == null ||
      num(totalLiquidity).eq(0) ||
      (num(myLiqudity).eq(0) && type == "myLiquidity")
    ) {
      return null;
    }

    const denoms = getPoolTokenDenoms(assets);
    const [token1, token2] = denoms;
    const [token1Symbol, token2Symbol] = [getSymbol(token1), getSymbol(token2)];
    const [token1Decimals, token2Decimals] = [
      getDecimals(token1),
      getDecimals(token2),
    ];
    let fraction = 1;

    if (type == "myLiquidity") {
      fraction = myLiqudity / totalLiquidity;
    }

    return [
      {
        label: token1Symbol,
        value: num(assets[0].amount)
          .div(10 ** token1Decimals)
          .times(fraction)
          .toNumber(),
      },
      {
        label: token2Symbol,
        value: num(assets[1].amount)
          .div(10 ** token2Decimals)
          .times(fraction)
          .toNumber(),
      },
    ];
  }, [type, assets, myLiqudity, totalLiquidity]);
};

export default useTokenTooltip;
