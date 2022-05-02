import { useMemo } from "react";
import useAddress from "hooks/useAddress";
import num from "libs/num";
import { useContracts, Route, useTokenInfo } from "modules/common";
import { minAmountReceive, useSwapSimulate } from "modules/swap";
import { createSwapMsgs as createMultiSwapMsgs } from "modules/swap/multiSwap";
import { createSwapMsgs as createMonoSwapMsgs } from "modules/swap/monoSwap";
import useExchangeRate from "./useExchangeRate";

type Params = {
  swapRoute: Route[] | null;
  token1: string;
  token2: string;
  amount1: string;
  amount2: string;
  slippage: string;
  reverse: boolean;
  onSimulateSuccess?: (item: any) => void;
  onSimulateError?: (e: any) => void;
};

export const useSwap = ({
  swapRoute,
  token1,
  token2,
  amount1,
  amount2,
  slippage,
  reverse = false,
  onSimulateError = () => null,
  onSimulateSuccess = () => null,
}: Params) => {
  const address = useAddress();
  const { getDecimals } = useTokenInfo();
  const { router } = useContracts();

  const terraAmount1 = num(amount1)
    .times(10 ** getDecimals(token1))
    .toFixed(0);
  const terraAmount2 = num(amount2)
    .times(num(10).pow(getDecimals(token2)))
    .toFixed(0);

  const simulated = useSwapSimulate({
    swapRoute,
    amount: reverse ? terraAmount2 : terraAmount1,
    token: reverse ? token2 : token1,
    token2: reverse ? token1 : token2,
    reverse,
    onSuccess: onSimulateSuccess,
    onError: onSimulateError,
  });

  const exchangeRate = useExchangeRate(token1, token2, simulated?.price);

  const minReceive = useMemo(() => {
    if (amount2 == "") {
      return null;
    }

    return minAmountReceive({
      amount: amount2,
      maxSpread: slippage,
    });
  }, [slippage, amount2]);

  const msgs = useMemo(() => {
    if (
      swapRoute == null ||
      token1 == null ||
      amount1 == "" ||
      num(amount1).eq(0) ||
      simulated.isLoading ||
      simulated.amount == null
    ) {
      return [];
    }

    if (swapRoute.length > 1) {
      return createMultiSwapMsgs(
        {
          token: token1,
          swapRoute,
          amount: terraAmount1,
          minReceive,
          router,
        },
        address || ""
      );
    }

    return createMonoSwapMsgs(
      {
        token: token1,
        swapRoute,
        amount: terraAmount1,
        slippage,
        price: simulated.beliefPrice,
      },
      address || ""
    );
  }, [
    address,
    token1,
    amount1,
    simulated,
    slippage,
    swapRoute,
    reverse,
    minReceive,
    router,
  ]);

  return useMemo(() => {
    return {
      msgs,
      minReceive,
      simulated,
      exchangeRate,
    };
  }, [msgs, minReceive, simulated, exchangeRate]);
};

export default useSwap;
