import { useMemo } from "react";
import useAddress from "hooks/useAddress";
import num from "libs/num";
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
  txHash?: string | undefined;
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
  onBroadcasting = () => null,
  onError = () => null,
}: Params): AuctionUnlockState => {
  const address = useAddress() || "";
  const { auction } = useContracts();

  const msgs = useMemo(() => {
    if (
      auction == null ||
      amount == null ||
      num(amount).eq(0) ||
      num(amount).isNaN()
    ) {
      return [];
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
