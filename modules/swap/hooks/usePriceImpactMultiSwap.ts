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
  amountInitial: string;
  to: string;
};

export function usePriceImpactMultiSwap({
  from,
  to,
  amountInitial,
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
      !amountInitial ||
      !swapRoute ||
      swapRoute.length <= 1 ||
      swapRoute.length != pools.length
    ) {
      return;
    }

    async function getPriceImpacts() {
      if (!swapRoute) return;

      let priceImpacts = [];
      let nextSwapInputAmount = Number(amountInitial);

      for (let i = 0; i < swapRoute.length; i++) {
        const sri = swapRoute[i];

        if (sri) {
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

            priceImpacts.push(
              num(swapPrice)
                .minus(poolPrice)
                .div(poolPrice)
                .times(100)
                .dp(2)
                .toNumber()
            );
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

            priceImpacts.push(
              num(1)
                .minus(num(price).div(swapPrice))
                .times(100)
                .dp(2, BigNumber.ROUND_HALF_UP)
                .abs()
                .toNumber()
            );
          }
        }
      }

      setPriceImpacts(priceImpacts.reduce((a, b) => a + b));
      return;
    }

    getPriceImpacts();
  }, [from, to, amountInitial]);

  return priceImpacts;
}

export default usePriceImpactMultiSwap;
