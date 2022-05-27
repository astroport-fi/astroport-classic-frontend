import { useMemo } from "react";
import num from "libs/num";
import { createStakeLpMsgs } from "modules/generator";
import {
  useContracts,
  useTransaction,
  TxStep,
  TxErrorHandler,
} from "modules/common";
import useAddress from "hooks/useAddress";
import { toTerraAmount } from "libs/terra";

export type StakeLpTokenState = {
  error: any;
  fee: any;
  txHash?: string;
  txStep: TxStep;
  reset: () => void;
  submit: () => void;
};

type Params = {
  amount: string | null;
  token: string | null;
  onBroadcasting?: (txHash: string) => void;
  onError?: TxErrorHandler;
};

export const useStakeLpToken = ({
  amount,
  token,
  onBroadcasting,
  onError,
}: Params): StakeLpTokenState => {
  const address = useAddress();
  const { generator } = useContracts();

  const msgs = useMemo(() => {
    if (amount == "" || num(amount).eq(0) || address == null || token == null) {
      return null;
    }

    return createStakeLpMsgs(
      { amount: toTerraAmount(amount), token, contract: generator },
      address
    );
  }, [address, amount, generator, token]);

  return useTransaction({
    notification: {
      type: "stakeLp",
    },
    msgs,
    onBroadcasting,
    onError,
  });
};
