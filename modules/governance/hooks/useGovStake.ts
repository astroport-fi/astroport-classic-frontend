import { useMemo } from "react";
import { num, useAddress } from "@arthuryeti/terra";

import { useContracts } from "modules/common";
import {
  createAstroStakeMsgs,
  createAstroUnstakeMsg,
} from "modules/governance";
import { AstroFormType } from "types/common";

export type Token = {
  amount: string;
  asset: string;
};

export type StakeState = {
  msgs: any;
};

type Params = {
  amount: string;
  type: AstroFormType;
};

export const useGovStake = ({ amount, type }: Params): StakeState => {
  const { astroToken, xAstroToken, staking } = useContracts();
  const address = useAddress();

  const msgs = useMemo(() => {
    if (num(amount).eq(0) || amount == "") {
      return null;
    }

    let token = astroToken;
    let msg = createAstroStakeMsgs(address, staking, amount, astroToken);

    if (type == AstroFormType.Unstake) {
      token = xAstroToken;
      msg = createAstroUnstakeMsg(address, staking, amount, xAstroToken);
    }

    return [msg];
  }, [address, staking, type, astroToken, xAstroToken, amount]);

  return { msgs };
};
