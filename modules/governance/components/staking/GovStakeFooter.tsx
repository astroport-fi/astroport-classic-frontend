import React, { FC } from "react";
import { fromTerraAmount, num, useBalance } from "@arthuryeti/terra";
import { Fee } from "@terra-money/terra.js";

import { ONE_TOKEN } from "constants/constants";
import {
  handleBigPercentage,
  handleTinyAmount,
  useContracts,
} from "modules/common";
import { AstroFormType } from "types/common";

import CommonFooter from "components/CommonFooter";

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
  const title = type === AstroFormType.Stake ? "Stake ASTRO" : "Unstake ASTRO";
  const newXAstro =
    type === AstroFormType.Stake ? newStakeXAstro : newUnstakeXAstro;

  return (
    <CommonFooter
      fee={fee}
      cells={[
        {
          title: type === AstroFormType.Stake ? "ASTRO:xASTRO" : "xASTRO:ASTRO",
          value:
            type === AstroFormType.Stake
              ? `1:${astroMintRatio}`
              : `1:${num(1 / astroMintRatio).dp(2)}`,
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
