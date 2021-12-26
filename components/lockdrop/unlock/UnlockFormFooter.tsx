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
  amount,
  duration,
  lpToken,
  onConfirmClick,
}) => {
  // const estimatedAstroRewards = useEstimatedAstroRewardsUnlock({
  //   lpToken,
  //   amount,
  //   duration,
  // });
  // const pool = usePool(lpToken);

  // const shareOfPool = useMemo(() => {
  //   if (pool == null || estimatedAstroRewards == null) {
  //     return null;
  //   }

  //   const incentive = num(pool.incentives_share).div(ONE_TOKEN);

  //   return num(estimatedAstroRewards).div(incentive).times(100).toFixed(2);
  // }, [pool, estimatedAstroRewards]);

  // const rewards = numeral(estimatedAstroRewards).format("0,0.00");

  const cells = [
    {
      title: "My new est. ASTRO rewards",
      value: `${0} ASTRO`,
    },
    {
      title: "My current share of this pool’s ASTRO rewards",
      value: `${0 || "0.00"}%`,
    },
  ];

  const confirmButton: ConfirmButton = {
    title: "Unlock LP token",
    isLoading: data.txStep == TxStep.Estimating,
    isDisabled: data.txStep != TxStep.Ready,
    type: "submit",
    onClick: onConfirmClick,
  };

  return (
    <CommonFooter cells={cells} fee={data.fee} confirmButton={confirmButton} />
  );
};

export default UnlockFormFooter;
