import { useMemo } from "react";
import { useAddress, num, toTerraAmount } from "@arthuryeti/terra";
import {
  useContracts,
  useTransaction,
  TxStep,
  TxErrorHandler,
} from "modules/common";
import { createUnstakeLpMsgs } from "modules/generator";
import useAddress from "hooks/useAddress";
import num from "libs/num";
import { toTerraAmount } from "libs/terra";

export type UnstakeLpTokenState = {
  error: any;
  fee: any;
  txHash?: string | undefined;
  txStep: TxStep;
  reset: () => void;
  submit: () => void;
};

type Params = {
  amount?: string;
  token?: string;
  onBroadcasting?: (txHash: string) => void;
  onError?: TxErrorHandler;
};

export const useUnstakeLpToken = ({
  amount,
  token,
  onBroadcasting = () => null,
  onError = () => null,
}: Params): UnstakeLpTokenState => {
  const { generator } = useContracts();
  const address = useAddress();

  const msgs = useMemo(() => {
    if (
      amount == "" ||
      num(amount || "0").eq(0) ||
      address == null ||
      token == null
    ) {
      return [];
    }

    return createUnstakeLpMsgs(
      { amount: toTerraAmount(amount), token, contract: generator },
      address
    );
  }, [address, amount, generator, token]);

  return useTransaction({
    notification: {
      type: "unstakeLp",
      data: {
        token: token || "",
      },
    },
    msgs,
    onBroadcasting,
    onError,
  });
};
