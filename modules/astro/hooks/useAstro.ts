import { useMemo } from "react";
import { useTransaction, useAddress, TxStep, num } from "@arthuryeti/terra";

import { ONE_TOKEN } from "constants/constants";
import { createIncreaseAllowanceExecuteMsg } from "modules/pool";
import { useContracts } from "modules/common";
import { createAstroStakeMsgs, createAstroUnstakeMsg } from "modules/astro";
import { AstroFormType } from "types/common";

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
  onSuccess: (txHash: string) => void;
};

export const useAstro = ({ amount, type, onSuccess }: Params): StakeState => {
  const { astroToken, xAstroToken, staking } = useContracts();
  const address = useAddress();

  const msgs = useMemo(() => {
    let token = astroToken;
    let msg = createAstroStakeMsgs(address, staking, amount);

    if (type == AstroFormType.Unstake) {
      token = xAstroToken;
      msg = createAstroUnstakeMsg(address, staking, amount);
    }

    return [
      createIncreaseAllowanceExecuteMsg(
        address,
        token,
        staking,
        num(amount).times(ONE_TOKEN).toFixed()
      ),
      msg,
    ];
  }, [address, staking, type, astroToken, xAstroToken, amount]);

  return useTransaction({
    msgs,
    onSuccess,
  });
};
