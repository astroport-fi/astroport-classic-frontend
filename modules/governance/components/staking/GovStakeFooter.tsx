import React, { FC } from "react";
import { Fee } from "@terra-money/terra.js";
import { handleBigAndTinyAmount } from "modules/common";
import { AstroFormType } from "types/common";
import CommonFooter from "components/CommonFooter";
import { composeAstroRatioDisplay } from "modules/governance/helpers";

type Props = {
  amount: number;
  fee?: Fee | undefined;
  type: AstroFormType;
  isLoading: boolean;
  isDisabled: boolean;
  astroMintRatio?: number | null | undefined;
};

const GovStakeFooter: FC<Props> = ({
  fee,
  type,
  isLoading,
  isDisabled,
  amount,
  astroMintRatio,
}) => {
  const title = type === AstroFormType.Stake ? "Stake ASTRO" : "Unstake xASTRO";

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
              : handleBigAndTinyAmount(amount * (1 / (astroMintRatio || 0)))
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
