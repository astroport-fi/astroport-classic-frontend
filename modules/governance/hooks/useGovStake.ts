import { useMemo } from "react";
import { useTransaction, useAddress, TxStep, num } from "@arthuryeti/terra";

import { ONE_TOKEN } from "constants/constants";
import { useContracts } from "modules/common";
import {
  createAstroStakeMsgs,
  createAstroUnstakeMsg,
} from "modules/governance";
import { AstroFormType } from "types/common";
import { TxInfo } from "@terra-money/terra.js";

export type Token = {
  amount: string;
  asset: string;
};

export type StakeState = {
  error: any;
  fee: any;
  txHash?: string;
  txStep: TxStep;
  reset: () => void;
  submit: () => void;
};

type Params = {
  amount: string;
  type: AstroFormType;
  onBroadcasting?: (txHash: string) => void;
  onSuccess?: (txHash: string, txInfo?: TxInfo) => void;
  onError?: (txHash?: string, txInfo?: TxInfo) => void;
};

export const useGovStake = ({
  amount,
  type,
  onBroadcasting,
  onSuccess,
  onError,
}: Params): StakeState => {
  const { astroToken, xAstroToken, staking } = useContracts();
  const address = useAddress();

  const msgs = useMemo(() => {
    let token = astroToken;
    let msg = createAstroStakeMsgs(address, staking, amount, astroToken);

    if (type == AstroFormType.Unstake) {
      token = xAstroToken;
      msg = createAstroUnstakeMsg(address, staking, amount, xAstroToken);
    }

    return [msg];
  }, [address, staking, type, astroToken, xAstroToken, amount]);

  return useTransaction({
    msgs,
    onBroadcasting,
    onSuccess,
    onError,
  });
};
