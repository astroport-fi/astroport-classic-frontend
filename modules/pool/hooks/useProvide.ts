import { useCallback, useEffect, useMemo, useState } from "react";
import { useWallet } from "@terra-money/wallet-provider";
import { Coin, Coins, StdSignMsg } from "@terra-money/terra.js";
import { useTerra } from "contexts/TerraContext";

import {
  isValidAmount,
  useCheckTx,
  useAddress,
  calculatePercentage,
} from "modules/terra";
import {
  createProvideTx,
  calculateSharePrice,
  calculateShare,
} from "modules/pool";
import { useTokenPrice } from "modules/swap";

type Params = {
  pair: any;
  token1: string;
  amount1: string;
  token2: string;
  amount2: string;
};

export const useProvide = ({
  pair,
  token1,
  token2,
  amount1,
  amount2,
}: Params) => {
  const { post } = useWallet();
  const address = useAddress();
  const { client } = useTerra();

  const [fee, setFee] = useState<Coins | null>(null);
  const [provideTx, setProvideTx] = useState<StdSignMsg | null>(null);
  const [provideResult, setProvideResult] = useState(null);

  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const token1Price = useTokenPrice(token1);
  const token2Price = useTokenPrice(token2);

  const totalSharePrice = useMemo(() => {
    if (!(pair && token1Price && token2Price)) {
      return null;
    }

    return calculateSharePrice(
      pair,
      pair.total_share,
      token1,
      token2,
      token1Price,
      token2Price
    );
  }, [pair, token1, token2, token1Price, token2Price]);

  const accountShare = useMemo(() => {
    if (!(pair && token1 && amount1)) {
      return null;
    }

    return calculateShare(pair, token1, amount1);
  }, [pair, token1, amount1]);

  const offerAssets = useMemo(() => {
    if (!(isValidAmount(amount1) && isValidAmount(amount2))) {
      return null;
    }

    return new Coins({
      [token1]: amount1,
      [token2]: amount2,
    });
  }, [token1, token2, amount1, amount2]);

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

    if (!(isValidAmount(amount1) && isValidAmount(amount2))) {
      return;
    }

    const data = await createProvideTx(
      {
        pair,
        coin1: new Coin(token1, amount1),
        coin2: new Coin(token2, amount2),
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
      msgs: data.msgs,
      feeDenoms: ["uusd"],
    });

    setProvideTx(tx);
    setFee(tx.fee.amount);
  }, [token1, token2, amount1, amount2, address, pair, client]);

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

export default useProvide;
