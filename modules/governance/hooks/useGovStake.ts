import { useMemo } from "react";
import useAddress from "hooks/useAddress";
import { useContracts } from "modules/common";
import {
  createAstroStakeMsgs,
  createAstroUnstakeMsg,
} from "modules/governance";
import { AstroFormType } from "types/common";
import num from "libs/num";

type StakeState = {
  msgs: any;
};

type Params = {
  amount: number;
  type: AstroFormType;
};

export const useGovStake = ({ amount, type }: Params): StakeState => {
  const { astroToken, xAstroToken, staking } = useContracts();
  const address = useAddress() || "";

  const msgs = useMemo(() => {
    if (num(amount).eq(0) || !amount) {
      return null;
    }

    let msg = createAstroStakeMsgs(
      address,
      staking,
      String(amount),
      astroToken
    );

    if (type == AstroFormType.Unstake) {
      msg = createAstroUnstakeMsg(
        address,
        staking,
        String(amount),
        xAstroToken
      );
    }

    return [msg];
  }, [address, staking, type, astroToken, xAstroToken, amount]);

  return { msgs };
};
