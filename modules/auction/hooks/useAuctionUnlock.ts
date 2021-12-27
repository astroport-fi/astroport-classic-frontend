import { useMemo } from "react";
import { useAddress, useTransaction, TxStep, num } from "@arthuryeti/terra";

import { createAuctionUnlockMsgs } from "modules/auction";
import { useContracts } from "modules/common";

export type AuctionUnlockState = {
  error: any;
  fee: any;
  txHash?: string;
  txStep: TxStep;
  reset: () => void;
  submit: () => void;
};

type Params = {
  amount: string;
  onSuccess?: (txHash: string) => void;
  onError?: (txHash?: string) => void;
};

export const useAuctionUnlock = ({
  amount,
  onSuccess,
  onError,
}: Params): AuctionUnlockState => {
  const address = useAddress();
  const { auction } = useContracts();

  const msgs = useMemo(() => {
    if (
      auction == null ||
      amount == null ||
      num(amount).eq(0) ||
      num(amount).isNaN()
    ) {
      return null;
    }

    return createAuctionUnlockMsgs(
      {
        contract: auction,
        amount,
      },
      address
    );
  }, [address, auction, amount]);

  return useTransaction({
    msgs,
    onSuccess,
    onError,
  });
};

export default useAuctionUnlock;
