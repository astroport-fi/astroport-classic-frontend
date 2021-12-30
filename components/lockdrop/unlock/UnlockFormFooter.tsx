import React, { FC, useMemo } from "react";
import { fromTerraAmount, num, TxStep } from "@arthuryeti/terra";

import { ONE_TOKEN } from "constants/constants";
// import { useEstimatedAstroRewardsUnlock, usePool } from "modules/lockdrop";

import CommonFooter, { ConfirmButton } from "components/CommonFooter";
import numeral from "numeral";

type Props = {
  data: any;
  amount: string;
  lpToken: string;
  duration: number;
  onConfirmClick: () => void;
};

const UnlockFormFooter: FC<Props> = ({
  data,

  onConfirmClick,
}) => {
  const confirmButton: ConfirmButton = {
    title: "Unlock LP token",
    isLoading: data.txStep == TxStep.Estimating,
    isDisabled: data.txStep != TxStep.Ready,
    type: "submit",
    onClick: onConfirmClick,
  };

  return <CommonFooter fee={data.fee} confirmButton={confirmButton} />;
};

export default UnlockFormFooter;
