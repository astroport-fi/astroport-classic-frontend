import { useCallback, useEffect, useState, useMemo } from "react";
import { Coins, StdSignMsg } from "@terra-money/terra.js";
import { useTerra } from "contexts/TerraContext";
import { isValidAmount, useAddress } from "modules/terra";
import {
  findSwapRoute,
  calculateMinimumReceive,
  useSimulation,
  createSwapTx,
} from "modules/swap";
import { useWallet } from "@terra-money/wallet-provider";
import { ONE_TOKEN } from "constants/constants";

type Params = {
  token1: string;
  amount1: string;
  token2: string;
  amount2: string;
  slippage: string;
};

export const useSwap = ({
  token1,
  token2,
  amount1,
  amount2,
  slippage,
}: Params) => {
  const [swapResult, setSwapResult] = useState<any | null>(null);
  const [swapTx, setSwapTx] = useState<StdSignMsg | null>(null);
  const [fee, setFee] = useState<Coins | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const {
    networkInfo: { routeContract },
    client,
    routes,
  } = useTerra();
  const address = useAddress();
  const { post } = useWallet();
  const { amount: exchangeRate } = useSimulation(
    token1,
    token2,
    String(ONE_TOKEN)
  );
  const { amount } = useSimulation(token1, token2, amount1);

  const swapRoute = useMemo(
    () => findSwapRoute(routes, token1, token2),
    [routes, token1, token2]
  );

  const isSwapMulti = swapRoute ? swapRoute.length > 1 : true;

  const minimumReceive = useMemo(() => {
    if (!isValidAmount(amount)) {
      return null;
    }

    return calculateMinimumReceive(amount, slippage);
  }, [amount, slippage]);

  const createTx = useCallback(async () => {
    setSwapTx(null);
    setFee(null);
    setErrorMsg(null);
    setHasError(false);

    if (!isValidAmount(amount1) || !isValidAmount(amount2) || !minimumReceive) {
      return;
    }

    const data = await createSwapTx(
      {
        token1,
        route: swapRoute,
        amount: amount1,
        slippage,
        minimumReceive,
        routeContract,
      },
      address
    );

    if (!data) {
      setHasError(true);
      return;
    }

    const tx = await client.tx.create(data.sender, { msgs: data.msgs });

    setSwapTx(tx);
    setFee(tx.fee.amount);
  }, [
    token1,
    amount1,
    amount2,
    slippage,
    address,
    routeContract,
    swapRoute,
    minimumReceive,
    client,
  ]);

  const swap = useCallback(async () => {
    if (!swapTx) {
      return;
    }

    const { msgs } = swapTx;

    const result = await post({ msgs });

    // eslint-disable-next-line no-console
    console.log(result);

    setSwapResult(result);
  }, [post, swapTx]);

  useEffect(() => {
    createTx();
  }, [createTx]);

  const isReady = !!minimumReceive && !!exchangeRate && !!swapTx;

  return {
    isReady,
    swapRoute,
    isSwapMulti,
    hasError,
    errorMsg,
    swapResult,
    minimumReceive,
    swapTx,
    fee,
    swap,
    exchangeRate,
  };
};

export default useSwap;
