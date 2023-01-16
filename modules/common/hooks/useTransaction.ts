import { useCallback, useState, useEffect, useMemo } from "react";
import { Coins, Coin, MsgExecuteContract, Fee } from "@terra-money/terra.js";
import { useQuery } from "react-query";
import { useTerraWebapp } from "context/TerraWebappContext";
import useAddress from "hooks/useAddress";
import useDebounceValue from "hooks/useDebounceValue";
import {
  useTx,
  TxErrorHandler,
  UseTxNotificationDetails,
} from "modules/common";
import { CLASSIC_DEFAULT_GAS_ADJUSTMENT } from "constants/constants";

export enum TxStep {
  /**
   * Idle
   */
  Idle,
  /**
   * Estimating fees
   */
  Estimating,
  /**
   * Ready to post transaction
   */
  Ready,
  /**
   * Signing transaction in Terra Station
   */
  Posting,
  /**
   * Broadcasting
   */
  Broadcasting,
  /**
   * Failed
   */
  Failed,
}

type Params = {
  msgs: MsgExecuteContract[];
  taxEnabled?: boolean;
  taxCoins?: Coins;
  gasAdjustment?: number;
  onBroadcasting?: (txHash: string) => void;
  onError?: TxErrorHandler;
  notification: UseTxNotificationDetails;
};

export const useTransaction = ({
  msgs,
  taxEnabled = false,
  taxCoins,
  gasAdjustment = CLASSIC_DEFAULT_GAS_ADJUSTMENT,
  onBroadcasting,
  onError,
  notification,
}: Params) => {
  const { client } = useTerraWebapp();
  const address = useAddress() || "";
  const debouncedMsgs = useDebounceValue(msgs, 200);

  const [txStep, setTxStep] = useState<TxStep>(TxStep.Idle);
  const [txHash, setTxHash] = useState<string | undefined>(undefined);
  const [error, setError] = useState<unknown | null>(null);

  const { data: fee } = useQuery<unknown, unknown, Fee>(
    ["fee", debouncedMsgs, error],
    async () => {
      if (debouncedMsgs == null || txStep != TxStep.Idle || error != null) {
        throw new Error("Error in estimating fee");
      }

      setError(null);
      setTxStep(TxStep.Estimating);

      const txOptions = {
        msgs: debouncedMsgs,
        gasPrices: new Coins([new Coin("uusd", 0.75)]),
        gasAdjustment,
        feeDenoms: ["uusd"],
      };

      const accountInfo = await client.auth.accountInfo(address);

      return client.tx.estimateFee(
        [
          {
            sequenceNumber: accountInfo.getSequenceNumber(),
            publicKey: accountInfo.getPublicKey(),
          },
        ],
        txOptions
      );
    },
    {
      enabled:
        debouncedMsgs != null &&
        debouncedMsgs.length > 0 &&
        txStep == TxStep.Idle &&
        error == null,
      refetchOnWindowFocus: false,
      retry: false,
      onSuccess: () => {
        setTxStep(TxStep.Ready);
      },
      onError: (e) => {
        // @ts-expect-error - don't know anything about error
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (e?.response?.data?.message) {
          // @ts-expect-error - don't know anything about error
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          setError(e.response.data.message);
        } else {
          setError("Something went wrong");
        }

        setTxStep(TxStep.Idle);
      },
    }
  );

  const { submit: submitTx } = useTx({
    notification,
    onPosting: () => {
      setTxStep(TxStep.Posting);
    },
    onBroadcasting: (txhash) => {
      setTxStep(TxStep.Broadcasting);
      setTxHash(txhash);

      onBroadcasting?.(txhash);
    },
    onError: (...args) => {
      setTxStep(TxStep.Failed);

      onError?.(...args);
    },
  });

  const reset = () => {
    setError(null);
    setTxHash(undefined);
    setTxStep(TxStep.Idle);
  };

  const submit = useCallback(async () => {
    let submitFee: Fee | undefined;

    if (taxEnabled && taxCoins) {
      // fee
      const gasFee = {
        amount: fee?.amount.toString().slice(0, -4) || "0",
        denom: "uusd",
      };
      const gasCoins = new Coins([Coin.fromData(gasFee)]);
      // fee + tax
      const feeCoins = gasCoins.add(taxCoins);
      submitFee = new Fee(fee?.gas_limit || 0, feeCoins);
    } else {
      submitFee = fee;
    }

    submitTx({
      msgs,
      fee: submitFee,
    });
  }, [submitTx, msgs, fee, taxEnabled, taxCoins]);

  useEffect(() => {
    if (error) {
      setError(null);
    }

    if (txStep != TxStep.Idle) {
      setTxStep(TxStep.Idle);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedMsgs]);

  return useMemo(() => {
    return {
      fee,
      submit,
      txStep,
      txHash,
      error,
      reset,
    };
  }, [fee, submit, txStep, txHash, error, reset]);
};

export default useTransaction;
