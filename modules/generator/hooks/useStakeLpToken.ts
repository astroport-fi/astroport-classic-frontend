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

export const useStakeLpToken = ({
  amount,
  token,
  onBroadcasting = () => null,
  onError = () => null,
}: Params): StakeLpTokenState => {
  const address = useAddress();
  const { generator } = useContracts();

  const msgs = useMemo(() => {
    if (
      amount == "" ||
      num(amount || "0").eq(0) ||
      address == null ||
      token == null
    ) {
      return [];
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
