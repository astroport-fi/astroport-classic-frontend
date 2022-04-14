import { useState, useEffect } from "react";
import { num, useTerraWebapp } from "@arthuryeti/terra";
import { getAssetAmountsInPool } from "libs/terra";
import BigNumber from "bignumber.js";

import { useAstroswap, useTokenInfo } from "modules/common";
import { useSwapRoute } from "modules/swap";
import { simulate as simulateMonoSwap } from "modules/swap/monoSwap";

import useGetPools from "modules/pool/hooks/useGetPools";

type Params = {
  from: string;
  amount1: string;
  to: string;
};

export function usePriceImpactMultiSwap({
  from,
  to,
  amount1,
}: Params): number | null {
  const { tokenGraph } = useAstroswap();
  const { client } = useTerraWebapp();
  const { getDecimals } = useTokenInfo();
  const swapRoute = useSwapRoute({ tokenGraph, from, to });
  const pools = useGetPools(swapRoute?.map((sri) => sri?.contract_addr));
  const [priceImpacts, setPriceImpacts] = useState(null);

  useEffect(() => {
    if (
      !from ||
      !to ||
      !amount1 ||
      swapRoute.length <= 1 ||
      swapRoute.length != pools.length
    ) {
      return;
    }

    async function getPriceImpacts() {
      let nextSwapInputAmount = Number(amount1);

      let priceImpacts = await Promise.all(
        swapRoute.map(async (sri, i) => {
          const fromDecimals = getDecimals(sri.from);
          const toDecimals = getDecimals(sri.to);
          const amount = (nextSwapInputAmount * 10 ** fromDecimals).toString();

          if (sri.type == "xyk") {
            // swap simulation
            const data: any = await simulateMonoSwap({
              client,
              swapRoute: [sri],
              token: sri.from,
              amount,
              reverse: false,
            });

            const { token1, token2 } = getAssetAmountsInPool(
              pools[i].assets,
              sri.to
            );

            const swapPrice = num(amount)
              .div(10 ** fromDecimals)
              .div(num(data.return_amount).div(10 ** toDecimals))
              .toFixed(18);

            const poolPrice = num(token2)
              .div(10 ** fromDecimals)
              .div(num(token1).div(10 ** toDecimals))
              .dp(18)
              .toNumber();

            nextSwapInputAmount = num(data.return_amount)
              .div(10 ** toDecimals)
              .toNumber();

            return num(swapPrice)
              .minus(poolPrice)
              .div(poolPrice)
              .times(100)
              .dp(2)
              .toNumber();
          } else if (sri.type == "stable") {
            const [data, dataB]: any = await Promise.all([
              // swap simulation
              simulateMonoSwap({
                client,
                swapRoute: [sri],
                token: sri.from,
                amount,
                reverse: false,
              }),
              // price simulation
              simulateMonoSwap({
                client,
                swapRoute: [sri],
                token: sri.from,
                amount: "100000",
                reverse: false,
              }),
            ]);

            const swapPrice = num(amount)
              .div(10 ** fromDecimals)
              .div(num(data.return_amount).div(10 ** toDecimals))
              .toFixed(18);

            const price = num(dataB.return_amount)
              .plus(dataB.commission_amount)
              .div(10 ** 5)
              .toNumber();

            nextSwapInputAmount = num(data.return_amount)
              .div(10 ** toDecimals)
              .toNumber();

            return num(1)
              .minus(num(price).div(swapPrice))
              .times(100)
              .dp(2, BigNumber.ROUND_HALF_UP)
              .abs()
              .toNumber();
          }

          return 0;
        })
      );

      setPriceImpacts(priceImpacts.reduce((a, b) => a + b));
    }

    getPriceImpacts();
  }, [from, to, amount1]);

  return priceImpacts;
}

export default usePriceImpactMultiSwap;
