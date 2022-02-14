import { useMemo } from "react";
import { useAddress, num } from "@arthuryeti/terra";

import { createAuctionUnlockMsgs } from "modules/auction";
import {
  useContracts,
  useTransaction,
  TxStep,
  TxErrorHandler,
} from "modules/common";

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
  onBroadcasting?: (txHash: string) => void;
  onError?: TxErrorHandler;
};

export const useAuctionUnlock = ({
  amount,
  onBroadcasting,
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
    notification: {
      type: "auctionUnlockLp",
    },
    msgs,
    gasAdjustment: 1.5,
    onBroadcasting,
    onError,
  });
};

export default useAuctionUnlock;
