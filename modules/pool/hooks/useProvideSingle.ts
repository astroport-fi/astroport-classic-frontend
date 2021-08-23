import { useCallback, useEffect, useMemo, useState } from "react";
import { useWallet } from "@terra-money/wallet-provider";
import { Coin, Coins, StdSignMsg } from "@terra-money/terra.js";
import { useTerra } from "contexts/TerraContext";

import { isValidAmount, useCheckTx, useAddress } from "modules/terra";
import {
  createProvideTx,
  calculateProvideOneAsset,
  calculateShare,
} from "modules/pool";
import {
  useTokenPrice,
  createSwapTx,
  findSwapRoute,
  simulateSwap,
} from "modules/swap";

type Params = {
  pair: any;
  token1: string;
  token2: string;
  amount: string;
};

export const useProvideSingle = ({ pair, token1, token2, amount }: Params) => {
  const { post } = useWallet();
  const address = useAddress();
  const {
    networkInfo: { routeContract },
    client,
    routes,
  } = useTerra();

  const [fee, setFee] = useState<Coins | null>(null);
  const [provideTx, setProvideTx] = useState<StdSignMsg | null>(null);
  const [provideResult, setProvideResult] = useState(null);

  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const tokenPrice = useTokenPrice(token1);

  const totalSharePrice = useMemo(() => {
    if (!(pair && tokenPrice)) {
      return null;
    }

    // return calculateSharePrice(pair, pair.total_share, token, tokenPrice);
    return "0.00";
  }, [pair, tokenPrice]);

  const accountShare = useMemo(() => {
    if (!(pair && token1 && amount)) {
      return null;
    }

    return calculateShare(pair, token1, amount);
  }, [pair, token1, amount]);

  const offerAssets = useMemo(() => {
    if (!isValidAmount(amount)) {
      return null;
    }

    return new Coins({
      [token1]: amount,
    });
  }, [token1, amount]);

  const {
    txCost,
    isEnoughBalance,
    isTxAvailable: isProvideAvailable,
  } = useCheckTx(offerAssets, fee);

  const createTx = useCallback(async () => {
    setProvideTx(null);
    setFee(null);
    setErrorMsg(null);
    setHasError(false);

    if (!isValidAmount(amount)) {
      return;
    }

    const swapRoute = findSwapRoute(routes, token1, token2);

    const swapAmount = String(Math.floor(Number(amount) / 2));

    const [swapTx, swapSimulationResult] = await Promise.all([
      createSwapTx(
        {
          token1,
          pairs: swapRoute,
          amount: swapAmount,
          routeContract,
        },
        address
      ),
      simulateSwap(client, routeContract, routes, token1, token2, swapAmount),
    ]);

    if (!(swapTx.msgs && swapSimulationResult?.amount)) {
      return;
    }

    const { provideAmountFirst, provideAmountSecond } =
      calculateProvideOneAsset(
        pair,
        token1,
        swapAmount,
        swapSimulationResult.amount
      );

    const data = await createProvideTx(
      {
        pair,
        coin1: new Coin(token1, provideAmountFirst),
        coin2: new Coin(token2, provideAmountSecond),
      },
      address
    );

    // eslint-disable-next-line no-console
    console.log(data);

    if (!data) {
      setHasError(true);
      return;
    }

    const tx = await client.tx.create(data.sender, {
      msgs: [...swapTx.msgs, ...data.msgs],
      feeDenoms: ["uusd"],
    });

    setProvideTx(tx);
    setFee(tx.fee.amount);
  }, [token1, token2, routes, routeContract, amount, address, pair, client]);

  const provideLiquidity = useCallback(async () => {
    if (!(provideTx && isProvideAvailable)) {
      return;
    }

    const { msgs } = provideTx;

    const response = await post({ msgs });

    // eslint-disable-next-line no-console
    console.log(response);

    setProvideResult(response);
  }, [isProvideAvailable, post, provideTx]);

  useEffect(() => {
    createTx();
  }, [createTx]);

  return {
    fee,
    accountShare,
    totalShare: pair.total_share,
    totalSharePrice,
    provideTx,
    provideResult,
    isEnoughBalance,
    isProvideAvailable,
    txCost,
    hasError,
    errorMsg,
    provideLiquidity,
  };
};

export default useProvideSingle;
