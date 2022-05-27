import React, { FC } from "react";
import { Fee } from "@terra-money/terra.js";

import { ONE_TOKEN } from "constants/constants";
import {
  useBalance,
  handleBigAndTinyAmount,
  handleBigPercentage,
  handleTinyAmount,
  useContracts,
} from "modules/common";
import { AstroFormType } from "types/common";

import CommonFooter from "components/CommonFooter";
import { composeAstroRatioDisplay } from "modules/governance/helpers";
import num from "libs/num";

type Props = {
  amount: number;
  fee: Fee;
  type: AstroFormType;
  isLoading: boolean;
  isDisabled: boolean;
  astroMintRatio: number | null;
};

const GovStakeFooter: FC<Props> = ({
  fee,
  type,
  isLoading,
  isDisabled,
  amount,
  astroMintRatio,
}) => {
  const { xAstroToken } = useContracts();
  const xAstroBalance = useBalance(xAstroToken);
  const newStakeXAstro = num(amount)
    .times(ONE_TOKEN)
    .plus(xAstroBalance)
    .toString();
  const newUnstakeXAstro = num(xAstroBalance)
    .minus(num(amount).times(ONE_TOKEN))
    .toString();
  const title = type === AstroFormType.Stake ? "Stake ASTRO" : "Unstake xASTRO";
  const newXAstro =
    type === AstroFormType.Stake ? newStakeXAstro : newUnstakeXAstro;

  return (
    <CommonFooter
      fee={fee}
      cells={[
        {
          title: "xASTRO:ASTRO",
          value: composeAstroRatioDisplay(astroMintRatio),
        },
        {
          title:
            type === AstroFormType.Stake ? "xASTRO Received" : "ASTRO Received",
          value: amount
            ? type === AstroFormType.Stake
              ? handleBigAndTinyAmount(amount)
              : handleBigAndTinyAmount(amount * (1 / astroMintRatio))
            : "-",
        },
      ]}
      confirmButton={{
        title: title,
        isDisabled,
        isLoading,
        type: "submit",
      }}
    />
  );
};

export default GovStakeFooter;
