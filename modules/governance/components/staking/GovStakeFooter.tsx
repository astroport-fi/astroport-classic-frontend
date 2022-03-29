import React, { FC } from "react";
import { fromTerraAmount, num, useBalance } from "@arthuryeti/terra";
import { Fee } from "@terra-money/terra.js";

import { ONE_TOKEN } from "constants/constants";
import { handleBigPercentage, useContracts } from "modules/common";
import { AstroFormType } from "types/common";

import CommonFooter from "components/CommonFooter";
import { useGovRatios } from "modules/governance/hooks";

type Props = {
  amount: number;
  fee: Fee;
  type: AstroFormType;
  isLoading: boolean;
  isDisabled: boolean;
};

const GovStakeFooter: FC<Props> = ({
  fee,
  type,
  isLoading,
  isDisabled,
  amount,
}) => {
  const { xAstroToken } = useContracts();
  const { xAstroRatio } = useGovRatios();
  const xAstroBalance = useBalance(xAstroToken);
  const newStakeXAstro = num(amount)
    .times(ONE_TOKEN)
    .plus(xAstroBalance)
    .toString();
  const newUnstakeXAstro = num(xAstroBalance)
    .minus(num(amount).times(ONE_TOKEN))
    .toString();
  const title = type === AstroFormType.Stake ? "Stake ASTRO" : "Unstake ASTRO";
  const newXAstro =
    type === AstroFormType.Stake ? newStakeXAstro : newUnstakeXAstro;

  return (
    <CommonFooter
      fee={fee}
      cells={[
        {
          title: "ASTRO:xASTRO Ratio",
          value: handleBigPercentage(xAstroRatio),
        },
        {
          title: "Current xASTRO",
          value: fromTerraAmount(xAstroBalance),
        },
        {
          title: "New xASTRO",
          value: fromTerraAmount(newXAstro),
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
