import React, { FC } from "react";
import { fromTerraAmount, num, useBalance } from "@arthuryeti/terra";

import { ONE_TOKEN } from "constants/constants";
import { useContracts } from "modules/common";
import { AstroFormType } from "types/common";

import CommonFooter from "components/CommonFooter";

type Props = {
  amount: string;
  data: any;
  type: AstroFormType;
  isLoading: boolean;
  isDisabled: boolean;
  onClick: () => void;
};

const GovStakeFooter: FC<Props> = ({
  data,
  type,
  isLoading,
  isDisabled,
  amount,
  onClick,
}) => {
  const { xAstroToken } = useContracts();
  const xAstroBalance = useBalance(xAstroToken);
  const newStakeXAstro = num(amount || 0)
    .times(ONE_TOKEN)
    .plus(xAstroBalance)
    .toString();
  const newUnstakeXAstro = num(xAstroBalance)
    .minus(num(amount || 0).times(ONE_TOKEN))
    .toString();
  const title = type === AstroFormType.Stake ? "Stake ASTRO" : "Unstake ASTRO";
  const newXAstro =
    type === AstroFormType.Stake ? newStakeXAstro : newUnstakeXAstro;

  return (
    <CommonFooter
      fee={data.fee}
      cells={[
        {
          title: "Current xAstro",
          value: fromTerraAmount(xAstroBalance),
        },
        {
          title: "New xAstro",
          value: fromTerraAmount(newXAstro),
        },
        {
          title: "xAstro APY",
          value: "0%",
        },
        {
          title: "% of voting power",
          value: "0%",
        },
      ]}
      confirmButton={{
        title: title,
        isDisabled,
        isLoading,
        onClick,
      }}
    />
  );
};

export default GovStakeFooter;
